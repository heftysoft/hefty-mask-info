import { DEFAULT_LENGTH, DEFAULT_OPTIONS } from "../constants";
import { MaskActions, Options } from "../types";

export const maskInfo = (
  object: any,
  attributes: string[],
  options: Options = DEFAULT_OPTIONS
) => {
  const copyObject = { ...object };
  recursiveMask(copyObject, attributes, options);
  return copyObject;
};

const recursiveMask = (object: any, attributes: string[], options: Options) => {
  Object.keys(object).forEach((key) => {
    // Apply recursively in child key
    if (
      object[key] &&
      typeof object[key] === "object" &&
      !Array.isArray(object[key])
    ) {
      recursiveMask(object[key], attributes, options);
    } else {
      // Base case
      if (attributes.includes(key)) {
        executeAction(object, key, options);
      }
      return;
    }
  });
};

/* Executes the action indicated in the options,
by default the action is to hide */
const executeAction = (
  object: any,
  attrPath: string,
  options: Options
): void => {
  switch (options.action) {
    case MaskActions.HIDE: {
      delete object[attrPath];
      break;
    }
    case MaskActions.MASK: {
      const length =
        options.useSameLength && object[attrPath]
          ? getLengthOfAttribute(object[attrPath])
          : DEFAULT_LENGTH;

      object[attrPath] = generateString(length, options.substituteChar);
      break;
    }
  }
};

/* Gets the length of the given variable */
const getLengthOfAttribute = (attrValue: any): number => {
  return Array.isArray(attrValue)
    ? attrValue.length + 1
    : attrValue.toString().length + 1;
};

/* In charge of generating a string with the
given length and compose of the char given */
const generateString = (length: number, char = "*"): string => {
  return Array.prototype.join.call({ length }, char);
};
