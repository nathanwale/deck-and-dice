import * as Oracle from './Oracle'
import { Rect } from './Geometry'

export type Group = {
    title: string,
    oracles: Oracle.Oracle[],
    frame: Rect,
}

export function pickall(group: Group): Oracle.Option[] {
    return group.oracles.map(item => Oracle.pick(item));
}

export function values(results: Oracle.Option[]): number[]
{
    const all_values = results.map(o => o.value);
    const numbers_only: number[] = all_values.filter((v): v is number => !!v);
    return numbers_only
        
}

export function sum(results: Oracle.Option[]): number
{
    return values(results)
        .reduce((acc, n) => acc + n);
}

export function summarise(results: [Oracle.Option, Oracle.Oracle][]): string
{
    return results
            .map(result => Oracle.summarise(result[0], result[1]))
            .join(", ");
}

export function add_oracle(group: Group, oracle: Oracle.Oracle): Group
{
    return {
        title: group.title,
        frame: group.frame,
        oracles: group.oracles.concat(oracle),
    }
}