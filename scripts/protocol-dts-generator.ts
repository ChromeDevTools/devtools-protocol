import * as fs from 'fs'
import * as path from 'path'
import {IProtocol, Protocol as P} from './protocol-schema'

// TODO: @noj validate this via https://github.com/andischerer/typescript-json-typesafe against protocol-schema.d.ts
const jsProtocol: IProtocol = require('../json/js_protocol.json')
const browserProtocol: IProtocol = require('../json/browser_protocol.json')
const protocolDomains: P.Domain[] = jsProtocol.domains.concat(browserProtocol.domains)

let numIndents = 0
let emitStr = ''

const emit = (str: string) => {
    emitStr += str
}

const getIndent = () => '    '.repeat(numIndents) // 4 spaced indents

const emitIndent = () => {
    emitStr += getIndent()
}

const emitLine = (str?: string) => {
    if (str) {
        emitIndent()
        emit(`${str}\n`)
    } else {
        emit('\n')
    }
}

const emitOpenBlock = (str: string, openChar = ' {') => {
    emitLine(`${str}${openChar}`)
    numIndents++
}

const emitCloseBlock = (closeChar = '}') => {
    numIndents--
    emitLine(closeChar)
}

const emitHeaderComments = () => {
    emitLine('/**********************************************************************')
    emitLine(' * Auto-generated by protocol-dts-generator.ts, do not edit manually. *')
    emitLine(' **********************************************************************/')
    emitLine()
}

const emitModule = (moduleName: string, domains: P.Domain[]) => {
    moduleName = toTitleCase(moduleName)
    emitHeaderComments()
    emitOpenBlock(`export module ${moduleName}`)
    emitGlobalTypeDefs()
    domains.forEach(emitDomain)
    emitCloseBlock()
    emitLine()
    emitLine(`export default ${moduleName};`)
}

const emitGlobalTypeDefs = () => {
    emitLine()
    emitLine(`export type integer = number`)
}

const emitDomain = (domain: P.Domain) => {
    const domainName = toTitleCase(domain.domain)
    emitLine()
    emitDescription(domain.description)
    emitOpenBlock(`export module ${domainName}`)
    if (domain.types) domain.types.forEach(emitDomainType)
    if (domain.commands) domain.commands.forEach(emitCommand)
    if (domain.events) domain.events.forEach(emitEvent)
    emitCloseBlock()
}

const getCommentLines = (description: string) => {
    const lines = description
        .split(/\r?\n/g)
        .map(line => ` * ${line}`)
    return [`/**`, ...lines, ` */`]
}

const emitDescription = (description?: string) => {
    if (description) getCommentLines(description).map(l => emitLine(l))
}

const getPropertyDef = (prop: P.PropertyType): string => {
    // Quote key if it has a . in it.
    const propName = /\./.test(prop.name) ? `'${prop.name}'` : prop.name
    return `${propName}${prop.optional ? '?' : ''}: ${getPropertyType(prop)}`
}

const getPropertyType = (prop: P.ProtocolType): string  => {
    if ('$ref' in prop)
        return prop.$ref
    else if (prop.type === 'array')
        return `${getPropertyType(prop.items)}[]`
    else if (prop.type === 'object')
        if (!prop.properties) {
            // TODO: actually 'any'? or can use generic '[key: string]: string'?
            return `any`
        } else {
            // hack: access indent, \n directly
            let objStr = '{\n';
            numIndents++
            objStr += prop.properties
                .map(p => `${getIndent()}${getPropertyDef(p)};\n`)
                .join('')
            numIndents--
            objStr += `${getIndent()}}`;
            return objStr
        }
    else if (prop.type === 'string' && prop.enum)
        return '(' + prop.enum.map((v: string) => `'${v}'`).join(' | ') + ')'
    return prop.type
}

const emitProperty = (prop: P.PropertyType) => {
    emitDescription(prop.description)
    emitLine(`${getPropertyDef(prop)};`)
}

const emitInterface = (interfaceName: string, props?: P.PropertyType[]) => {
    emitOpenBlock(`export interface ${interfaceName}`)
    props ? props.forEach(emitProperty) : emitLine('[key: string]: string;')
    emitCloseBlock()
}

const emitDomainType = (type: P.DomainType) => {
    emitLine()
    emitDescription(type.description)

    if (type.type === 'object') {
        emitInterface(type.id, type.properties)
    } else {
        emitLine(`export type ${type.id} = ${getPropertyType(type)};`)
    }
}

const toTitleCase = (str: string) => str[0].toUpperCase() + str.substr(1)

const toCmdRequestName = (commandName: string) => `${toTitleCase(commandName)}Request`

const toCmdResponseName = (commandName: string) => `${toTitleCase(commandName)}Response`

const emitCommand = (command: P.Command) => {
    // TODO(bckenny): should description be emitted for params and return types?
    if (command.parameters) {
        emitLine()
        emitInterface(toCmdRequestName(command.name), command.parameters)
    }

    if (command.returns) {
        emitLine()
        emitInterface(toCmdResponseName(command.name), command.returns)
    }
}

const toEventPayloadName = (eventName: string) => `${toTitleCase(eventName)}Event`

const emitEvent = (event: P.Event) => {
    if (!event.parameters) {
        return
    }
    
    emitLine()
    emitDescription(event.description)
    emitInterface(toEventPayloadName(event.name), event.parameters)
}

const getEventMapping = (event: P.Event, domainName: string, modulePrefix: string): P.RefType & P.PropertyBaseType => {
    // Use TS3.0+ tuples
    const payloadType = event.parameters ?
        `[${modulePrefix}.${domainName}.${toEventPayloadName(event.name)}]` :
        '[]'

    return {
        // domain-prefixed name since it will be used outside of the module.
        name: `${domainName}.${event.name}`,
        // TODO(bckenny): does having a description help anywhere?
        // description: event.description,
        $ref: payloadType
    }
}

const isWeakInterface = (params: P.PropertyType[]): boolean => {
    return params.every(p => !!p.optional)
}

const getCommandMapping = (command: P.Command, domainName: string, modulePrefix: string): P.ObjectType & P.PropertyBaseType => {
    const prefix = `${modulePrefix}.${domainName}.`
    // Use TS3.0+ tuples for paramsType
    let requestType = '[]'
    if (command.parameters) {
        const optional = isWeakInterface(command.parameters) ? '?' : ''
        requestType = '[' + prefix + toCmdRequestName(command.name) + optional + ']'
    }
    const responseType = command.returns ? prefix + toCmdResponseName(command.name) : 'void'

    return {
        type: 'object',
        name: `${domainName}.${command.name}`,
        // TODO(bckenny): does having a description help anywhere?
        // description: command.description,
        properties: [{
            name: 'paramsType',
            $ref: requestType,
        }, {
            name: 'returnType',
            $ref: responseType,
        }]
    }
}

const flatten = <T>(arr: T[][]) => ([] as T[]).concat(...arr)

const emitMapping = (moduleName: string, protocolModuleName: string, domains: P.Domain[]) => {
    moduleName = toTitleCase(moduleName)
    emitHeaderComments()
    emitLine(`import Protocol from './${protocolModuleName}'`)
    emitLine()
    emitDescription('Mappings from protocol event and command names to the types required for them.')
    emitOpenBlock(`export module ${moduleName}`)

    const protocolModulePrefix = toTitleCase(protocolModuleName)
    const eventDefs = flatten(domains.map(d => {
        const domainName = toTitleCase(d.domain)
        return (d.events || []).map(e => getEventMapping(e, domainName, protocolModulePrefix))
    }))
    emitInterface('Events', eventDefs)

    emitLine()

    const commandDefs = flatten(domains.map(d => {
        const domainName = toTitleCase(d.domain)
        return (d.commands || []).map(c => getCommandMapping(c, domainName, protocolModulePrefix))
    }))
    emitInterface('Commands', commandDefs)

    emitCloseBlock()
    emitLine()
    emitLine(`export default ${moduleName};`)
}

const flushEmitToFile = (path: string) => {
    console.log(`Writing to ${path}`)
    fs.writeFileSync(path, emitStr, {encoding: 'utf-8'})

    numIndents = 0
    emitStr = ''
}

// Main
const destProtocolFilePath = `${__dirname}/../types/protocol.d.ts`
const protocolModuleName = path.basename(destProtocolFilePath, '.d.ts')
emitModule(protocolModuleName, protocolDomains)
flushEmitToFile(destProtocolFilePath)

const destMappingFilePath = `${__dirname}/../types/protocol-mapping.d.ts`
const mappingModuleName = 'ProtocolMapping'
emitMapping(mappingModuleName, protocolModuleName, protocolDomains)
flushEmitToFile(destMappingFilePath)
