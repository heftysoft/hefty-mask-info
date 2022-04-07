import { MaskActions } from "../types";
import { maskInfo } from '../lib/hefty-mask-info';
import {
  mockArray,
  mockBoolean,
  mockMultipleAttrsHideResultString,
  mockMultipleAttrsHideString,
  mockMultipleAttrsMaskResultString,
  mockMultipleAttrsMaskString,
  mockMultipleHideString,
  mockMultipleMaskString,
  mockNull,
  mockNumber,
  mockResultArray,
  mockResultBoolean,
  mockResultHideMultipleString,
  mockResultHideString,
  mockResultMaskMultipleString,
  mockResultNull,
  mockResultNumber,
  mockResultString,
  mockString,
} from "./mock-data";

const ID_FIELD = "id";
const NAME_FIELD = "name";
const FEATURES_FIELD = "features";
const MASK_OPTIONS = Object.freeze({
  action: MaskActions.MASK,
  useSameLength: true,
});
const HIDE_OPTIONS = Object.freeze({
  action: MaskActions.HIDE,
  useSameLength: false,
});

describe("maskInfo functionality", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("When only 1 attribute and 1 occurrence, the attribute is hidden", () => {
    expect(maskInfo(mockString, [FEATURES_FIELD], HIDE_OPTIONS)).toStrictEqual(
      mockResultHideString
    );
  });

  test("When only 1 attribute and 1 occurrence, the attribute is masked", () => {
    expect(
      maskInfo(mockString, [FEATURES_FIELD], MASK_OPTIONS)
    ).toStrictEqual(mockResultString);
  });

  test("When only 1 attribute and multiple occurrence, the attribute is hidden", () => {
    expect(maskInfo(mockMultipleHideString, [NAME_FIELD], HIDE_OPTIONS)).toStrictEqual(
      mockResultHideMultipleString
    );
  });

  test("When only 1 attribute and multiple occurrence, the attribute is masked", () => {
    expect(
      maskInfo(mockMultipleMaskString, [NAME_FIELD], MASK_OPTIONS)
    ).toStrictEqual(mockResultMaskMultipleString);
  });

  test("When only 1 attribute and 1 occurrence, attribute is a number, the attribute is masked", () => {
    expect(
      maskInfo(mockNumber, [FEATURES_FIELD], MASK_OPTIONS)
    ).toStrictEqual(mockResultNumber);
  });

  test("When only 1 attribute and 1 occurrence, attribute is a boolean, the attribute is masked", () => {
    expect(
      maskInfo(mockBoolean, [FEATURES_FIELD], MASK_OPTIONS)
    ).toStrictEqual(mockResultBoolean);
  });

  test("When only 1 attribute and 1 occurrence, attribute is an array, the attribute is masked", () => {
    expect(
      maskInfo(mockArray, [FEATURES_FIELD], MASK_OPTIONS)
    ).toStrictEqual(mockResultArray);
  });

  test("When only 1 attribute and 1 occurrence, attribute is null, the attribute is masked", () => {
    expect(
      maskInfo(mockNull, [FEATURES_FIELD], MASK_OPTIONS)
    ).toStrictEqual(mockResultNull);
  });

  test("When multiple attributes, the attributes are hidden", () => {
    expect(
      maskInfo(mockMultipleAttrsHideString, [NAME_FIELD, ID_FIELD], HIDE_OPTIONS)
    ).toStrictEqual(mockMultipleAttrsHideResultString);
  });

  test("When multiple attributes, the attributes are masked", () => {
    expect(
      maskInfo(
        mockMultipleAttrsMaskString,
        [NAME_FIELD, ID_FIELD],
        MASK_OPTIONS
      )
    ).toStrictEqual(mockMultipleAttrsMaskResultString);
  });
  test("When have full length list on options, the attributes are masked", () => {
    expect(
      maskInfo(
        {password: "123456789", email: "test@test.com"},
        ['email'],
        {
          action: MaskActions.MASK,
          fullLengthList: ['password'],
        }
      )
    ).toStrictEqual({
      password: "*********", email: "******est.com"
    });
  });
});
