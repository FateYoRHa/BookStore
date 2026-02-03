import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage";
import Users from "./pages/users/Users";
import CreateUser from "./pages/users/CreateUser";
import UserDetail from "./pages/users/UserDetail";
import Books from "./pages/books/Books";
import AddBook from "./pages/books/AddBook";
import BookDetail from "./pages/books/BookDetail";
import Customers from "./pages/customers/Customers";
import CreateCustomer from "./pages/customers/CreateCustomer";
import CustomerDetail from "./pages/customers/CustomerDetail";

const App = () => {
  return (
    <div data-theme="caramellatte" className="bg-primary-content min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserDetail />} />

        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<AddBook />} />
        <Route path="/books/:id" element={<BookDetail />} />

        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/add" element={<CreateCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
      </Routes>
    </div>
  );
};

export default App;
