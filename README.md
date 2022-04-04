# Hefty Mask Info

Another library to use for masking or deleting one or multiple nested attributes from a Javascript object.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Usage](#usage)
- [Methods](#methods)
- [Notes](#notes)
- [License](#license)
- [Author](#author)

## Install

``` bash
npm install hefty-mask-info
```

## Usage

### Example of masking attributes

```ts
import {
  MaskActions,
  maskInfo,
} from 'hefty-mask-info';

// The object that has the attribute(s) to hide or mask
const testObject = {
  name: "hefty-mask-info",
  features: {
    id: "nm123456",
    date: "2021-10-01T14:36:06.265Z",
    isEnabled: true,
    author: {
      country: "Spain",
      name: "Rodrigo",
    }
  }
}

const testObjectMask = maskInfo(testObject, ["name", "isEnabled"], {
  action: MaskActions.MASK,
});

// RESULT
/*
  {
    name: "*****",
    features: {
      id: "nm123456",
      date: "2021-10-01T14:36:06.265Z",
      isEnabled: "****",
      author: {
        country: "Spain",
        name: "*****",
      }
    }
  }
*/
```

### Example of hiding attributes

```ts
import {
  MaskActions,
  maskInfo,
} from 'hefty-mask-info';

// The object that has the attribute(s) to hide or mask
const testObject = {
  name: "hefty-mask-info",
  features: {
    id: "nm123456",
    date: "2021-10-01T14:36:06.265Z",
    isEnabled: true,
    author: {
      country: "Spain",
      name: "Rodrigo",
    }
  }
}


const testObjectHide = maskInfo(testObject, ["name", "isEnabled"], {
  action: MaskActions.HIDE,
});
// or
/* 
  const testObjectHide = maskInfo(testObject, ["name", "isEnabled"], {
    action: MaskActions.HIDE,
  });
*/

// RESULT
/*
  {
    features: {
      id: "nm123456",
      date: "2021-10-01T14:36:06.265Z",
      author: {
        country: "Spain",
      }
    }
  }
*/

```

## Notes

If the attribute is contained in the object but it is of type "object" then it will not work. Admitted data types:

- string
- number
- boolean
- array

## Methods

```maskInfo(object, attributes, options);```

- **object(any)**: The input object that you want to get the attribute(s) from. Any Javascript object is valid.

- **attributes(string[])**: Array of attributes from which you want to mask or hide.

- **options(Options)**: There are different options:

|      OPTIONS     |           TYPE          |                                                                                         DESCRIPTION                                                                                        |
|:--------------:|:-----------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|     action     | MaskAction  (HIDE/MASK) |                                                                       Action to execute when the attribute is found.                                                                       |
| substituteChar |    string (optional)    |                                     Default is "*". Char or string to substitute current value. **[It is only applied if the action is MaskActions.MASK]**                                     |
|  useSameLength |    boolean (optional)   | Default is false. Flag to indicate if the length of the string that will replace the original value of the attribute will keep the same length. If set to false, by default the length used is 5. **[It is only applied if the action is MaskActions.MASK]** |

## License

MIT

## Author

Md Nasir Uddin

## Credits

- <a href="https://github.com/rluque8">Rodrigo Luque</a>

- This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build hefty-mask-info` to build the library.

## Running unit tests

Run `nx test hefty-mask-info` to execute the unit tests via [Jest](https://jestjs.io).
