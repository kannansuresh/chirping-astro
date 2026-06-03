import { describe, expect, test } from 'bun:test';
import { slugify } from './slugify';

describe('slugify', () => {
  test('Latin tags remain unchanged', () => {
    expect(slugify('JavaScript')).toBe('javascript');
  });

  test('Japanese tags work', () => {
    expect(slugify('テスト')).toBe('テスト');
  });

  test('Malayalam tags work', () => {
    expect(slugify('മലയാളം')).toBe('മലയാളം');
  });

  test('Mixed strings work', () => {
    expect(slugify('日本語 テスト')).toBe('日本語-テスト');
  });

  test('Multiple spaces become single hyphen', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  test('Special characters are removed', () => {
    expect(slugify('hello@world!')).toBe('helloworld');
  });

  test('Leading and trailing hyphens are trimmed', () => {
    expect(slugify('  hello  ')).toBe('hello');
  });

  test('Mixed Latin and Unicode', () => {
    expect(slugify('React テスト')).toBe('react-テスト');
  });

  test('Accented characters are preserved', () => {
    expect(slugify('café')).toBe('café');
  });

  test('Empty string after processing returns empty', () => {
    expect(slugify('!!!')).toBe('');
  });
});
