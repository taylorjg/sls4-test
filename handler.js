export const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Serverless v4 with Node.js 22!',
      input: event,
    }),
  };
};
