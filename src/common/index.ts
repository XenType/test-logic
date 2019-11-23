export const expectEquality = (result: any, expectedResult: any, useStrictEqual: boolean = false): void => {
    if (useStrictEqual) {
        expect(result).toStrictEqual(expectedResult);
    } else {
        expect(result).toEqual(expectedResult);
    }
    return;
};
