export type Card = {
    name: string;
    value?: number; 
}

export function from_names(names: string[]): Card[] {
    return names.map((n) => {return { name: n }})
}