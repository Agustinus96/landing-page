// import { useState } from "react";
// import Container from "../components/container";

// function RegisterPage() {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, password }),
//     });

//     if (res.ok) {
//       alert("Registered succesfully");
//       // Redirect or clear form
//     } else {
//       const result = await res.json();
//       alert(result.message); // Show error message from server
//     }
//   };

//   return (
//     <>
//     <Container>
//         <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//           placeholder="Admin ID"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       </div>
//       </Container>
//     </>
//   );
// }

// export default RegisterPage
