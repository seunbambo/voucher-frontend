export const validateInputs = (userData, setError) => {
  const { username, password, role } = userData;
  let errorMsg = {
    usernameError: '',
    passwordError: '',
    roleError: '',
  };
  let formValid = true;

  if (!username) {
    formValid = false;
    errorMsg.usernameError = 'Please enter a username';
  }

  if (typeof username !== undefined) {
    if (username.length <= 3 || username.length > 8) {
      formValid = false;
      errorMsg.usernameError = 'Username must be between 4 and 8 characters.';
    }
  }

  if (!password) {
    formValid = false;
    errorMsg.passwordError = 'Please enter a password';
  }

  if (typeof password !== undefined) {
    // /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[a-a])(?=.*[@#$%&]).*$/
    if (!password.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {
      formValid = false;
      errorMsg.passwordError =
        'Password must be at least 6 characters long. It must contain at least one uppercase, lowercase and number.';
    }
  }

  if (role === '') {
    formValid = false;
    errorMsg.roleError = 'Please select a role';
  }

  setError(errorMsg);

  return formValid;
};

export const departmentsArray = () => {
  const result = [
    {
      id: 0,
      title: 'IT',
      key: 'departments',
    },
    {
      id: 1,
      title: 'Finance',
      key: 'departments',
    },
    {
      id: 2,
      title: 'Human Resources',
      key: 'departments',
    },
    {
      id: 3,
      title: 'Sales/Marketing',
      key: 'departments',
    },
  ];

  return result;
};

export const prioritiesArray = () => {
  const result = [
    {
      id: 0,
      title: 'Low',
      key: 'priorities',
    },
    {
      id: 1,
      title: 'Medium',
      key: 'priorities',
    },
    {
      id: 2,
      title: 'High',
      key: 'priorities',
    },
  ];

  return result;
};
