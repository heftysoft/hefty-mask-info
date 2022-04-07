import { MaskActions, Options } from "../types";

export const DEFAULT_LENGTH = 5;

export const DEFAULT_OPTIONS: Options = Object.freeze({
  action: MaskActions.MASK,
  urlParse: false,
  maskTimePropsNormally: false,
  maskFromRight: false,
  useSameLength: false,
  fullLengthList: [],
  onlyFirstOccurrence: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isMaskable(value: any) {
    const type = typeof value;
    if (value === null) return true;
    return (value instanceof Date) || (type !== 'object' && type !== 'function');
  },
});
