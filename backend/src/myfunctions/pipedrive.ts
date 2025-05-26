export async function PipedriveV2(object, method, data) {
  const twenty: any = await fetch(
    process.env.PIPEDRIVE_PROXY +
      `/api/v2/${object}?api_token=${process.env.PIPEDRIVE_API_KEY}`,
    {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TWENTY_API_KEY}`,
      },
      body: JSON.stringify(data),
    }
  );
  const json = twenty.json();
  return json;
}
