export const searchFunc = (data, searchParam) => {
  if (searchParam === '') return [];
  return data.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchParam.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchParam.toLowerCase()) ||
      user.userHandler.toLowerCase().includes(searchParam.toLowerCase())
    );
  });
};
