import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start mx-auto">
        <div className="btn btn-ghost text-xl font-serif">
          <a className="text-emerald-600 text-3xl">Leaf</a>& Spine
        </div>
      </div>
      <div className="navbar-center mx-auto items-center flex lg:flex font-serif">
        <ul className="menu menu-horizontal px-1 font-serif font-bold">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/books"}>Categories</Link>
          </li>
          <li>
            {/* onlick it will redirect to /books but will show the books that was sold the most */}
            <Link to={"/"}>Best Sellers</Link>
          </li>
          <li>
            <Link to={"/"}>New Arrivals</Link>
          </li>
          <li>
            <Link to={"/"}>Authors</Link>
          </li>
          <li>
            <Link to={"/"}>About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2">
          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-48 md:w-auto"
          />
          {/* CART */}
          <div className="flex-none">
            <div className="dropdown dropdown-end mx-auto">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-secondary-content btn-circle">
                <div className="indicator">
                  <ShoppingCart />
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* PROFILE */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
