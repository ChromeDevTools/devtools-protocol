/**  Definition for protocol.json types */
export interface IProtocol {
    version: Protocol.Version
    domains: Protocol.Domain[]
}

export module Protocol {
    export interface Version {
        major: string
        minor: string
    }

    export interface Domain extends BaseType {
        /** Name of domain */
        domain: string
        /** Dependencies on other domains */
        dependencies?: string[]
        /** Types used by the domain. */
        types?: PropertyType[]
        /** Commands accepted by the domain */
        commands?: Command[]
        /** Events fired by domain */
        events?: Event[]
    }

    export interface Command extends Event {
        returns?: ParameterType[]
        async?: boolean
        redirect?: string
    }

    export interface Event extends BaseType {
        name: string
        parameters?: ParameterType[]
        handlers?: string[]
    }

    type PropertyType = (
        (StringType & PropBaseType) |
        (ObjectType & PropBaseType) |
        (ArrayType & PropBaseType) |
        (PrimitiveType & PropBaseType)
    )

    type ParameterType = (
        (ObjectType & ParamBaseType) |
        (ArrayType & ParamBaseType) |
        (StringType & ParamBaseType) |
        (PrimitiveType & ParamBaseType) |
        (AnyType & ParamBaseType) |
        (RefType & ParamBaseType)
    )

    export interface ArrayType {
        type: "array"
        /** Maps to a typed array e.g string[] */
        items: RefType | PrimitiveType | StringType | AnyType | ObjectType
        /** Cardinality of length of array type */
        minItems?: number
        maxItems?: number
    }

    export interface ObjectType {
        type: "object"
        /** Properties of the type. Maps to a typed object */
        properties?: ParameterType[]
    }

    export interface StringType {
        type: "string"
        /** Possible values of a string. */
        enum?: string[]
    }

    export interface PrimitiveType {
        type: "number" | "integer" | "boolean"
    }

    export interface AnyType {
        type: "any"
    }

    export interface RefType {
        /** Reference to a domain defined type */
        $ref: string
    }

    export interface ParamBaseType extends BaseType {
        /** Name of param */
        name: string
        /** Is the property optional ? */
        optional?: boolean
    }

    export interface PropBaseType extends BaseType {
        /** Name of property */
        id: string
    }

    export interface BaseType {
        /** Description of the type */
        description?: string
        /** Not for public use */
        hidden?: boolean
        /** Is the api deprecated for future use ? */
        deprecated?: boolean
        /** Entities marked as exported:true have special generated C++ classes which can be used in public API */
        exported?: boolean
        /** The structure is still experimental. */
        experimental?: boolean
    }

    /** Interface that aids in the generation of client and adapter interfaces */
    export interface FunctionType extends ParamBaseType {
        type: "function" | "lambda"
        accepts?: (FunctionType | ParameterType)[]
        returns?: FunctionType | string
    }
}
