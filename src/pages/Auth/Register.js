// eslint-disable-next-line
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res.data) {
        toast.success("Register successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("error in registration!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"eCommerce Registration"}>
      <div
        className="mt-5 m-auto d-flex flex-column align-items-center justify-content-center"
        style={{ width: "400px" }}
      >
        <h1>Register page</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="enter name"
              style={{ width: "300px" }}
              className="form-control text-center"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <input
              type="email"
              placeholder="enter email"
              style={{ width: "300px" }}
              className="form-control text-center"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <input
              type="password"
              placeholder="enter password"
              style={{ width: "300px" }}
              className="form-control text-center"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="enter phone"
              style={{ width: "300px" }}
              className="form-control text-center"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="enter address"
              style={{ width: "300px" }}
              className="form-control text-center"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              placeholder="favorite sport"
              style={{ width: "300px" }}
              className="form-control text-center"
              value={answer}
              required
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
