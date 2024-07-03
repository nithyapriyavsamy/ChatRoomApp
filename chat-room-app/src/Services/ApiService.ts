function ApiService() {
    const handleRequest = (request: Promise<Response>) => {
      return request
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          console.error("Error:", error);
        });
    };
  
    const EnterRoom = async (payload: any) => {
      const response = await handleRequest(
        fetch("http://localhost:5131/api/ChatRoom/enterRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
      );
      return response;
    };
  
    const ExitRoom = async (payload: any) => {
      const response = await handleRequest(
        fetch("http://localhost:5131/api/ChatRoom/exitRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
      );
      return response;
    };
  
    return { EnterRoom, ExitRoom };
  }
  
  export default ApiService;
  