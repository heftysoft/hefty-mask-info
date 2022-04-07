# Hefty Mask Info

Another library to use for masking or deleting one or multiple nested attributes from a Javascript object.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Usage](#usage)
- [Methods](#methods)
- [Time & Date](#time-&-date)
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
| urlParse | boolean (optional) | Default is false. If true, the url will be parsed and the attributes will be masked.|
| substituteChar |    string (optional)    |                                     Default is "*". Char or string to substitute current value. **[It is only applied if the action is MaskActions.MASK]**                                     |
|  useSameLength |    boolean (optional)   | Default is false. Flag to indicate if the length of the string that will replace the original value of the attribute will keep the same length. If set to false, by default the length used is 5. **[It is only applied if the action is MaskActions.MASK]** |
|  useSameLength |    boolean (optional)   | Default is false. Flag to indicate if the length of the string that will replace the original value of the attribute will keep the same length. If set to false, by default the length used is 5. **[It is only applied if the action is MaskActions.MASK]** |
| maskTimePropsNormally | boolean (optional) | Default is false. Flag to indicate if the time properties of the date object will be masked normally. [See More](#time-&-date). **[It is only applied if the action is MaskActions.MASK]** |
| maskFromRight | boolean (optional) | Default is false. Flag to indicate if the masking will be done from right to left. **[It is only applied if the action is MaskActions.MASK]** |
| fullLengthList | Array of string (optional) | Default is []. Flag to indicate if the list of attributes will be masked with the full length of the attribute. The list of attributes will be masked as "*****".**[It is only applied if the action is MaskActions.MASK]** |
| isMaskable | (value: any) => boolean (optional) | A callback that decides whether types are maskable. Should return `true|false`. Default function says no to objects and functions, yes to other types. **[It is only applied if the action is MaskActions.MASK]** |

## Time & Date

mask-info can handle values that are Date objects without any problem. However, logging applications (e.g. Kibana) sometimes call `new Date()` on properties whose keys make them look like times/dates e.g. `'timeStamp'` or `'createDate'`. If called on an asterisked string this can lead to a wrong but misleading (and unmasked) date.

Therefore, to be on the safe side, if asked to mask properties like this maskInfo will return an empty string unless the option `maskTimePropsNormally` is set to true. If it is, properties with 'time' or 'date' in their keys will be masked normally as strings, e.g. masking `{ createTime: new Date(2013, 13, 1) }` will return `{ createTime: '*******************************00 (GMT)' }`.

Date objects with keys that do not have 'time' or 'date' in them will always be masked in this way regardless of the configured options.

## License

MIT

## Author

Md Nasir Uddin

## Credits

- <a href="https://github.com/rluque8">Rodrigo Luque</a>
- <a href="https://github.com/gwpmad">George Maddocks</a>

- This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build hefty-mask-info` to build the library.

## Running unit tests

Run `nx test hefty-mask-info` to execute the unit tests via [Jest](https://jestjs.io).
