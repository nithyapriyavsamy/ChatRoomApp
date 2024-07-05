function ApiService() {
    const handleRequest = async (request: Promise<Response>) => {
      try {
        const response = await request;
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const GetRoomMembers = async () => {
      const response = await handleRequest(
        fetch("http://localhost:5131/api/ChatRoom/roommembers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
      return response;
    };
  
    return { GetRoomMembers };
  }
  
  export default ApiService;
  