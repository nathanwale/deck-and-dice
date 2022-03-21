export function shuffle<T>(list: T[]): T[] {
    const result = list.map((x) => x);
    for (let i=list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]]
    }
    return result;
}

export function randnum(from: number, to: number): number {
    return Math.floor(Math.random() * (to - from + 1) + from)
}

export function pick<T>(list: T[]): T
{
    const end = list.length - 1;
    const index = randnum(0, end);
    return list[index];
}

export function test_randnum_distribution() {
    // counts of appearances for all possible permutations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count: any = {
        "1": 0,
        '2': 0,
        '3': 0,
    };
    
    for (let i = 0; i < 1000; i++) {
        const result = randnum(1, 3).toString();
        count[result]++;
    }
    
    // show counts of all possible permutations
    for (const key in count) {
        console.log(`${key}: ${count[key]}`);
    }
}

export function test_shuffle_distribution() {
    // counts of appearances for all possible permutations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count: any = {
        "123": 0,
        '132': 0,
        '213': 0,
        '231': 0,
        '321': 0,
        '312': 0
    };
    
    for (let i = 0; i < 1000; i++) {
        const array = [1, 2, 3];
        const result = shuffle(array);
        count[result.join('')]++;
    }
    
    // show counts of all possible permutations
    for (const key in count) {
        console.log(`${key}: ${count[key]}`);
    }
}

// test_shuffle_distribution()
// test_randnum_distribution()