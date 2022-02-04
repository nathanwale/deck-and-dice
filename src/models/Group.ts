import * as Oracle from './Oracle'
import { Rect } from './Geometry'

export type Group = {
    title: string,
    oracles: Oracle.Oracle[],
    frame: Rect,
}

export function pickall(group: Group): Oracle.Result[] {
    return group.oracles.map((item) => {
        return Oracle.pick(item);
    })
}

export function values(results: Oracle.Result[]): number[]
{
    return results
        .map((r: Oracle.Result) => r[0].value)
        .filter((v) => v != undefined);
}

export function sum(results: Oracle.Result[]): number
{
    return values(results)
        .reduce((acc, n) => acc + n);
}

export function summarise(results: Oracle.Result[]): string
{
    return results
            .map(Oracle.summarise)
            .join(", ");
}