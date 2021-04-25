import { BlindLevel } from '../../src/ts/blinds/blind-level';
import { BlindStructure } from '../../src/ts/blinds/blind-structure';
import { BlindValues } from '../../src/ts/blinds/blind-values';

const twoLevelsStructure = new BlindStructure([
    new BlindLevel(1, new BlindValues(10, 20)),
    new BlindLevel(2, new BlindValues(20, 40))
])

test('Init default blind structure', () => {
    const defaultStructure = BlindStructure.initDefaultBlindLevels();
    const structure = new BlindStructure(defaultStructure);
    expect(structure.blindLevels.length).toBe(12);
    expect(structure.blindLevels[0].level).toBe(1);
    expect(structure.blindLevels[1].level).toBe(2);
})

describe('Handle current level', () => {
    
    test('Should increase and decrease valid levels', () => {
        const structure = twoLevelsStructure;
        expect(structure.currentLevel).toBe(1);
        structure.increaseCurrentLevel();
        expect(structure.currentLevel).toBe(2);
        structure.decreaseCurrentLevel();
        expect(structure.currentLevel).toBe(1);
    })

    test('Should not allow levels smaller than 1', () => {
        const structure = twoLevelsStructure;expect(structure.currentLevel).toBe(1);
        structure.decreaseCurrentLevel();
        expect(structure.currentLevel).toBe(1);
    })

    test('Should not allow levels higher then structure length', () => {
        const structure = twoLevelsStructure;expect(structure.currentLevel).toBe(1);
        structure.increaseCurrentLevel();
        structure.increaseCurrentLevel();
        expect(structure.currentLevel).toBe(2);
    })
})
