const DIRECTORIES = ['src/pages', 'src/components'];
const DATA_TEST_ID = 'data-test-id';
const TEST_PATTERN =
  '^CT_([a-zA-Z0-9\\[\\]\\/]*)_{fileName}_([a-zA-Z0-9\\[\\]\\/]*)?$';
const FILENAME_PLACEHOLDER = '{fileName}';

module.exports = {
  rules: {
    'pages_container-data-test-id': {
      meta: {
        fixable: 'code',
        docs: {
          description: 'data-test-id lint',
          recommended: true,
          url: 'https://jamtangan.atlassian.net/wiki/spaces/QA/pages/1387986945/Automation+Jamtangan',
        },
      },
      defaultOptions: [
        {
          testIdPattern: TEST_PATTERN,
          testIdAttribute: DATA_TEST_ID,
        },
      ],
      create: (context) => {
        const { options = [{}] } = context;
        const testIdPattern = options[0]
          ? options[0]?.testIdPattern || TEST_PATTERN
          : TEST_PATTERN;
        const directories = options[0]
          ? options[0]?.directories || DIRECTORIES
          : DIRECTORIES;
        const dataTestId = options[0]
          ? options[0]?.dataTestId || DATA_TEST_ID
          : DATA_TEST_ID;

        const fileNames = context.getFilename();
        let needCheck = false;

        if (
          !fileNames.includes('/Layout') &&
          !fileNames.includes('/_app') &&
          !fileNames.includes('/_document') &&
          !fileNames.includes('/__tests__')
        ) {
          directories.every((directory) => {
            if (fileNames.includes(directory)) {
              needCheck = true;

              return false;
            }

            return true;
          });
        }

        const getFileNameData = () => {
          const splitPath = fileNames.split('/');
          const fileNameWithExtension = splitPath.pop() ?? '';
          const parent = splitPath.pop();
          const fileName = fileNameWithExtension.split('.').shift();

          return {
            fileName: fileName === 'index' ? parent : fileName,
          };
        };

        const getTestIdValidator = (fileName) =>
          new RegExp(testIdPattern.replace(FILENAME_PLACEHOLDER, fileName));

        const doFix = (fixer, fileName, element) => {
          const suggestedId = `CT_[Page/Container]_${fileName}_[name]`;
          const attributeText = `${dataTestId}="${suggestedId}"`;

          if (element && element.name) {
            const namePositionEnd = element.range[1];
            const start = namePositionEnd - 1;
            const end = start + 1;

            return fixer.insertTextBeforeRange(
              [start, end],
              ` ${attributeText}`,
            );
          }
        };

        if (needCheck) {
          return {
            ReturnStatement(node) {
              const firstElement = node.argument.openingElement;
              const { fileName } = getFileNameData();

              if (firstElement) {
                const dataTestID = firstElement.attributes.find(
                  ({ name }) => name?.name === dataTestId,
                );

                if (dataTestID === undefined) {
                  return context.report({
                    node,
                    message:
                      'First element on Page/Containers need to add data-test-id props as references for e2e testing',
                    fix: (fixer) => doFix(fixer, fileName, firstElement, node),
                  });
                }

                /** check with data-test-id format */
                const rules = getTestIdValidator(fileName);
                const testIdValue = dataTestID?.value?.value;

                if (!rules.test(testIdValue)) {
                  return context.report({
                    node,
                    message: `data-test-id format: "CT_Page/Container_${fileName}_name"`,
                    // fix: (fixer) => {
                    //   doFix(fixer, fileName, firstElement, node)
                    // }
                  });
                }
              }
            },
          };
        }

        return {};
      },
    },
  },
};
