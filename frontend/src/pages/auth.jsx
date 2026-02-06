import React from "react";
import {
  Scale,
  Activity,
  FileText,
  MessageCircle,
  Users,
  UserSearch,
  Send,
  CircleQuestionMark,
} from "lucide-react";
import { useParams } from "react-router-dom";
import Login from "@/components/auth/login.jsx";
import Register from "@/components/auth/register.jsx";

const AuthPage = () => {
  const { form } = useParams();
  const currentForm=form || "login";
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 h-screen w-screen">
      <div className="bg-foreground px-10 py-10 xl:pt-0 xl:flex xl:flex-col xl:justify-center">
        <div>
          <h1 className="text-3xl font-bold text-background flex items-center gap-3">
            <Scale size={40} /> LawConnect
          </h1>
          <p className="text-lg text-muted-foreground font-light my-3">
            Connecting lawyers, clients, and the judiciary seamlessly.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-background my-2 flex items-center gap-1">
            Why LawConnect
            <CircleQuestionMark size={25} />
          </h2>
          <p className="text-muted-foreground text-lg font-light my-3 text-justify">
            LawConnect is designed to simplify legal services for
            everyone—clients, lawyers, and the judiciary. Whether you’re seeking
            legal advice, managing cases, or tracking progress, LawConnect keeps
            everything in one secure platform.
          </p>

          <ul className="mt-8 space-y-3 text-background text-md">
            <li className="group">
              <p className="flex items-center gap-3 text-background transition-colors duration-500 ease-in-out group-hover:text-border">
                <UserSearch
                  size={25}
                  className="text-blue-500 transition-colors duration-500 ease-in-out group-hover:text-border"
                />
                Allows clients to find lawyer
              </p>
            </li>

            <li className="group">
              <p className="flex items-center gap-3 text-background transition-colors duration-500 ease-in-out group-hover:text-border">
                <Send
                  size={25}
                  className="text-blue-500 transition-colors duration-500 ease-in-out group-hover:text-border"
                />
                Send proposals
              </p>
            </li>

            <li className="group">
              <p className="flex items-center gap-3 text-background transition-colors duration-500 ease-in-out group-hover:text-border">
                <MessageCircle
                  size={25}
                  className="text-blue-500 transition-colors duration-500 ease-in-out group-hover:text-border"
                />
                Send messages
              </p>
            </li>

            <li className="group">
              <p className="flex items-center gap-3 text-background transition-colors duration-500 ease-in-out group-hover:text-border ">
                <Users
                  size={25}
                  className="text-blue-500 transition-colors duration-500 ease-in-out group-hover:text-border"
                />
                Client and lawyer communication
              </p>
            </li>

            <li className="group">
              <p className="flex items-center gap-3 text-background transition-colors duration-500 ease-in-out group-hover:text-border ">
                <FileText
                  size={25}
                  className="text-blue-500 transition-colors duration-500 ease-in-out group-hover:text-border"
                />
                File and case management
              </p>
            </li>

            <li className="group">
              <p className="flex items-center gap-3 text-background transition-colors duration-500 ease-in-out group-hover:text-border ">
                <Activity
                  size={25}
                  className="text-blue-500 transition-colors duration-500 ease-in-out group-hover:text-border"
                />
                Track case progress
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {
          currentForm === "login" ? <Login /> : <Register />
        }
      </div>
    </div>
  );
};

export default AuthPage;
