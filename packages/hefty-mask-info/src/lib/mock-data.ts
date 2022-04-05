export const mockArray = {
  name: "Test library",
  features: ["hide", "mask"],
};

export const mockResultArray = {
  name: "Test library",
  features: ["****", "****"],
};

export const mockBoolean = {
  name: "Test library",
  features: true,
};

export const mockResultBoolean = {
  name: "Test library",
  features: "****",
};

export const mockNumber = {
  name: "Test library",
  features: 2,
};

export const mockResultNumber = {
  name: "Test library",
  features: "*",
};

export const mockNull = {
  name: "Test library",
  features: null,
};

export const mockResultNull = {
  name: "Test library",
  features: "****",
};

export const mockString = {
  name: "Test library",
  features: "mask",
};

export const mockResultHideString = {
  name: "Test library",
};

export const mockResultString = {
  name: "Test library",
  features: "****",
};

export const mockMultipleMaskString = {
  name: "Test library",
  features: {
    name: "hide",
    enabled: true,
  },
};

export const mockMultipleHideString = {
  name: "Test library",
  features: {
    name: "hide",
    enabled: true,
  },
};

export const mockResultHideMultipleString = {
  features: {
    enabled: true,
  },
};

export const mockResultMaskMultipleString = {
  name: "************",
  features: {
    name: "****",
    enabled: true,
  },
};

export const mockMultipleAttrsHideString = {
  name: "Test library",
  features: {
    id: "hide",
    enabled: true,
  },
};

export const mockMultipleAttrsHideResultString = {
  features: {
    enabled: true,
  },
};

export const mockMultipleAttrsMaskString = {
  name: "Test",
  features: {
    id: "hide",
    enabled: true,
  },
};

export const mockMultipleAttrsMaskResultString = {
  name: "****",
  features: {
    id: "****",
    enabled: true,
  },
};
