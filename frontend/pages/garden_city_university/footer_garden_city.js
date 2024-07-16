import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-[#56100F] h-[517px] text-white p-4">
      <div className="flex justify-between">
        {/* Left Section: Logo and Contact Information */}
        <div className="flex flex-col items-start">
          <img src="/college logo.png" alt="Logo" className="h-[50px] w-[193.42px] mr-3 mt-2" />
          <div className="mt-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Garden City University - Campus</h4>
              <p className="footer-text text-xs">
                16th KM, Old Madras Road,<br />
                Bangalore – 560 049<br />
                Phone: +91 (80) 66487600 / +91<br />
                90-1992-1992
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">City University – City Office</h4>
              <p className="footer-text text-xs">
                GCC HOUSE, No. 340 Indiranagar<br />
                Double Rd, Stage 1, Indiranagar,<br />
                Bengaluru – 560038,<br />
                Phone: +91 90-1992-1992<br />
                Email Us At:<br />
                pro@gardencity.university
              </p>
            </div>
          </div>
        </div>
        {/* Vertical Line */}
        <div className="border-l border-white h-auto mx-4"></div>

        {/* Right Section: About GCU */}
        <div className="mt-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">About GCU</h4>
            <ul className="text-xs">
            <li className="mb-2">
                <Link href="/Leadership and Governance" legacyBehavior>
                  <a className="hover:underline">Leadership and Governance</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/GCU Concept" legacyBehavior>
                  <a className="hover:underline">GCU Concept</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/UGC Proforma" legacyBehavior>
                  <a className="hover:underline">UGC Proforma</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/IQAC" legacyBehavior>
                  <a className="hover:underline">IQAC</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Objects of GCU" legacyBehavior>
                  <a className="hover:underline">Objects of GCU</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Strategic Vision Plan 2030" legacyBehavior>
                  <a className="hover:underline">Strategic Vision Plan 2030</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Rules and Regulations" legacyBehavior>
                  <a className="hover:underline">Rules and Regulations</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Nationality of Gardenians" legacyBehavior>
                  <a className="hover:underline">Nationality of Gardenians</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/International Students" legacyBehavior>
                  <a className="hover:underline">International Students</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/International Collaborations" legacyBehavior>
                  <a className="hover:underline">International Collaborations</a>
                </Link>
                </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Placements */}
        <div className="mt-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Placements</h4>
            <ul className="text-xs">
            <li className="mb-2">
                <Link href="/About Placement Cell" legacyBehavior>
                  <a className="hover:underline">About Placement Cell</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Placement Process" legacyBehavior>
                  <a className="hover:underline">Placement Process</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Recruiters" legacyBehavior>
                  <a className="hover:underline">Recruiters</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Placement Reports" legacyBehavior>
                  <a className="hover:underline">Placement Reports</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Placements Assistance" legacyBehavior>
                  <a className="hover:underline">Placements Assistance</a>
                </Link>
                </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Admissions */}
        <div className="mt-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Admissions</h4>
            <ul className="text-xs">
            <li className="mb-2">
                <Link href="/Procedure" legacyBehavior>
                  <a className="hover:underline">Procedure</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Fee Structure" legacyBehavior>
                  <a className="hover:underline">Fee Structure</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Apply Online" legacyBehavior>
                  <a className="hover:underline">Apply Online</a>
                </Link>
                </li>
            </ul>
            <br />
            <h4 className="text-sm font-semibold mb-2">Campus Life</h4>
            <ul className="text-xs">
            <li className="mb-6">
                <Link href="/GCU Facilities" legacyBehavior>
                  <a className="hover:underline">GCU Facilities</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Accommodation" legacyBehavior>
                  <a className="hover:underline">Accommodation</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/Student Clubs" legacyBehavior>
                  <a className="hover:underline">Student Clubs</a>
                </Link>
                </li>
                <li className="mb-2">
                <Link href="/News & Events" legacyBehavior>
                  <a className="hover:underline">News & Events</a>
                </Link>
                </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Quick links */}
        <div className="mt-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Quick Links</h4>
            <ul className="text-xs">
              <li className="mb-2">
                <Link href="/contact" legacyBehavior>
                  <a className="hover:underline">Contact Us</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/careers" legacyBehavior>
                  <a className="hover:underline">Careers</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/grievance" legacyBehavior>
                  <a className="hover:underline">Grievance Redressal</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/scholarship" legacyBehavior>
                  <a className="hover:underline">Scholarship</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faculty" legacyBehavior>
                  <a className="hover:underline">Faculty</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/research" legacyBehavior>
                  <a className="hover:underline">Research</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/privacy" legacyBehavior>
                  <a className="hover:underline">Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-t border-white my-4" />
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-baseline">
          <span>Garden City University</span>
          <span className="mx-2">©</span>
          <span>2024. All rights reserved.</span>
        </div>
        <div className="flex space-x-4">
          <Link href="/terms" legacyBehavior>
            <a className="hover:underline">Terms & Conditions</a>
          </Link>
          <span>|</span>
          <Link href="/privacy" legacyBehavior>
            <a className="hover:underline">Privacy Policy</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .footer-text {
          font-family: 'Public Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          line-height: 19.6px;
          letter-spacing: 0.01em;
          text-align: left;
        }
          ul > li {
          margin-bottom: 24px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
