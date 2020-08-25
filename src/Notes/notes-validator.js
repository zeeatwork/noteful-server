const logger = require("../logger");

const NO_ERRORS = null;

function getNoteValidationError({ note_title, note_details, parent_folder }) {
  if (!note_title) {
    logger.error(`Invalid name'${note_title}' supplied`);
    return {
      error: {
        message: `'note_title' must be supplied.`,
      },
    };
  } else if (!note_details) {
    logger.error(`Invalid name'${note_details}' supplied`);
    return {
      error: {
        message: `'note_details' must be supplied.`,
      },
    };
  } else if (!parent_folder) {
    logger.error(`Invalid folder'${parent_folder}' supplied`);
    return {
      error: {
        message: `'parent_folder' must be supplied.`,
      },
    };
  }

  return NO_ERRORS;
}

module.exports = {
  getNoteValidationError
};
