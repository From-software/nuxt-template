import { describe, test, expect } from 'vitest'
import { capitalize } from '../../shared/utils/formatting'

describe('formatting', () => {
    test('should capitalize a string', () => {
        const input = 'abcd'
        const expected = 'ABCD'

        expect(capitalize(input)).toBe(expected)
    })
})
