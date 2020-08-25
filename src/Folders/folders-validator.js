
const logger = require("../logger");
const foldersRouter = require("./folders-router");

const NO_ERRORS = null;
/*required in FOlder */
/*required in NOTES */


function getFolderValidationError({ folder_name }) {
  if (!folder_name) {
    logger.error(`Invalid name'${folder_name}' supplied`);
    return {
      error: {
        message: `'folder_name' must be supplied.`,
      },
    };
  }


  return NO_ERRORS;
}

module.exports = {
  getFolderValidationError,
};
