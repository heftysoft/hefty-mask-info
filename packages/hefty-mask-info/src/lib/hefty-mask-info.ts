/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_LENGTH, DEFAULT_OPTIONS } from '../constants';
import { MaskActions, Options } from '../types';

import * as urlParse from 'url-parse';
import { isPlainObject, mapValues, omitBy } from 'lodash';

/**
 *
 * @param options Check if options are valid
 */
const checkOptions = (options: Options): void => {
  // Check if options exist
  const exists = (value: unknown) => typeof value !== 'undefined';

  // destructure options
  const {
    onlyFirstOccurrence,
    substituteChar,
    useSameLength,
    maskTimePropsNormally,
    maskFromRight,
    fullLengthList,
  } = options;

  // Check if options are valid
  if (exists(onlyFirstOccurrence) && typeof onlyFirstOccurrence !== 'boolean') {
    throw new Error('onlyFirstOccurrence must be a boolean');
  }
  if (exists(substituteChar) && typeof substituteChar !== 'string') {
    throw new Error('substituteChar must be a string');
  }
  if (exists(useSameLength) && typeof useSameLength !== 'boolean') {
    throw new Error('useSameLength must be a boolean');
  }
  if (
    exists(maskTimePropsNormally) &&
    typeof maskTimePropsNormally !== 'boolean'
  ) {
    throw new Error('maskTimePropsNormally must be a boolean');
  }
  if (exists(maskFromRight) && typeof maskFromRight !== 'boolean') {
    throw new Error('maskFromRight must be a boolean');
  }
  if (exists(fullLengthList) && Array.isArray(fullLengthList) && !fullLengthList.every((key) => typeof key === 'string')) {
    throw new Error('fullLengthList must be a contain strings');
  }
};

/**
 *
 * @param {string | number} key The key of the property to check
 * @param {boolean} maskTimePropsNormally Mask time props normally
 * @returns {boolean} indicating if the key should be masked or not
 */
const shouldBeEmptyString = (
  key: string | number,
  maskTimePropsNormally: boolean
): boolean =>
  ['date', 'time'].some((word) => String(key).toLowerCase().includes(word)) &&
  !maskTimePropsNormally;

/**
 *
 * @param {any} value The value to mask
 * @param {string | number} key The key of the value to mask
 * @param {Options} options Options for masking
 * @returns {string} The masked value
 */
const maskPrimitive = (
  value: any,
  key: string | number,
  options: Options
): string => {
  const {
    useSameLength = false,
    maskTimePropsNormally = false,
    maskFromRight = false,
    substituteChar = '*',
    fullLengthList = [],
  } = options;

  /* Logging applications sometimes call new Date() on properties whose keys make them look like times/dates
    e.g. 'timeStamp' or 'createDate'. If called on an asterisked string this can lead to a wrong but misleading
    (and unmasked) date, so to be on the safe side return an empty string unless configured to do otherwise. */
  if (shouldBeEmptyString(key, maskTimePropsNormally)) return '';

  const arrayFromString = !maskFromRight
    ? String(value).split('')
    : String(value).split('').reverse();
  const valueLength = arrayFromString.length;
  if (valueLength <= 3 || useSameLength || (fullLengthList.length && fullLengthList.includes(String(key))))
    return substituteChar.repeat(valueLength);

  const indexToMaskTo = DEFAULT_LENGTH;
  const maskedString = arrayFromString.reduce(
    (acc, char, i) =>
      `${acc}${i <= indexToMaskTo ? substituteChar : arrayFromString[i]}`,
    ''
  );

  if (maskFromRight) return maskedString.split('').reverse().join('');
  return maskedString;
};

const qsMask = (
  value: any,
  keysToMask: string[],
  options: Options
): string | null => {
  if (typeof value === 'string') {
    if (!options.urlParse) {
      return value;
    }
    let parsedUrl: urlParse<Record<string, string | undefined>>;
    try {
      parsedUrl = urlParse(value, true);
    } catch (e) {
      // string is url with query and there is an un-decodable escape sequence in query, (e.g. '%E0%A4%A'). return with query chopped off
      return value.substring(0, value.indexOf('?'));
    }
    const qsKeysToMask = Object.keys(parsedUrl.query).filter((key) =>
      keysToMask.includes(key)
    );
    if (qsKeysToMask.length) {
      qsKeysToMask.forEach((keyToMask) => {
        parsedUrl.query[keyToMask] = maskPrimitive(
          parsedUrl.query[keyToMask],
          keyToMask,
          options
        );
      });
      parsedUrl.set('query', parsedUrl.query);
      return parsedUrl.href;
    }
  }
  return null;
};

/**
 *
 * @param {any} source The source to mask
 * @param {string | number} key The key of the source to mask
 * @param {string[]} keysToMask The keys to mask
 * @param {Options} options Options for masking
 * @returns {any} The masked source
 */
const maskDeep = (
  source: any,
  key: string | number,
  keysToMask: string[],
  options: Options
): any => {
  if (options.isMaskable && options.isMaskable(source))
    return maskPrimitive(source, key, options);
  if (Array.isArray(source))
    return source.map((value, idx) =>
      maskDeep(value, idx, keysToMask, options)
    );

  if (isPlainObject(source)) {
    return mapValues(source, (value, _key) =>
      maskDeep(value, _key, keysToMask, options)
    );
  }

  return source;
};

/**
 *
 * @param {any} source The source to mask
 * @param {string[]} keysToMask The keys to mask
 * @param {Options} options for masking
 * @returns {any} Masked source
 */
export const maskInfo = (
  source: any,
  keysToMask: string[],
  options: Options = {
    action: MaskActions.MASK,
  }
): any => {
  checkOptions(options);
  const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);

  const topLevelQsMaskResult = qsMask(source, keysToMask, finalOptions);
  if (topLevelQsMaskResult) return topLevelQsMaskResult;
  if (finalOptions.isMaskable && finalOptions.isMaskable(source)) return source; // source is url with no offending query props or it's just stringlike - so we're just returning it.
  if (finalOptions.action === MaskActions.HIDE) {
    if (isPlainObject(source)) {
      source = omitBy(source, (_, key) => keysToMask.includes(key));
    }
  }
  const propertyHandler = (value: any, key: string | number) => {
    const qsMaskResult = qsMask(value, keysToMask, finalOptions);
    if (qsMaskResult) {
      value = qsMaskResult;
    }
    if (keysToMask.includes(String(key))) {
      return maskDeep(value, key, keysToMask, finalOptions);
    }
    if (finalOptions.fullLengthList?.length && finalOptions.fullLengthList.includes(String(key))) {
      return maskDeep(value, key, keysToMask, finalOptions);
    }
    if (isPlainObject(value) || Array.isArray(value)) {
      return maskInfo(value, keysToMask, options);
    }
    return value;
  };
  if (Array.isArray(source)) return source.map(propertyHandler);
  return mapValues(source, propertyHandler);
};
