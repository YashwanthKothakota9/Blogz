import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-apple-200  text-apple-950 rounded-b-lg">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-1/2 p-6">
            <div className="flex h-full flex-col justify-between items-center">
              <div className="inline-flex items-center">
                <Logo width="50px" />
              </div>
              <h3 className="text-xl italic font-semibold">
                Blogs that will make you fall in love with writing!
              </h3>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024 Yashwanth Kothakota. All Rights
                  Reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-9">
            <div className="w-1/2 p-6 text-left">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-400">
                  Links
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-500 hover:text-gray-600"
                      to="https://twitter.com/Yashcsp22"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-500 hover:text-gray-600"
                      to="https://github.com/YashwanthKothakota9"
                    >
                      Github
                    </Link>
                  </li>
                  <li className="mb-4">
                    <a
                      className=" text-base font-medium text-gray-500 hover:text-gray-600"
                      href="mailto:yashwanthkothakota@gmail.com?Subject=From%20Blogz"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-1/2 p-6 text-left">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-400">
                  Legals
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-500 hover:text-gray-600"
                      to="/"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-500 hover:text-gray-600"
                      to="/"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" text-base font-medium text-gray-500 hover:text-gray-600"
                      to="/"
                    >
                      Licensing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
