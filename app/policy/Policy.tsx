import React from "react";

const Policy = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-extrabold text-center  text-gray-800 dark:text-white mb-8">
          ELearning Platform Terms and Policy
        </h1>

        <div className="text-lg leading-relaxed space-y-6">
          {/* Introduction Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to ELearning! By using our platform, you agree to comply
              with the following terms and policies. Please read these terms
              carefully before accessing or using the services. If you disagree
              with any part of the policy, you may not use our services.
            </p>
          </section>

          {/* Account Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              2. User Account
            </h2>
            <p>
              To use certain features on ELearning, you must create an account.
              When doing so, you agree to:
              <ul className="list-disc ml-8 mt-2">
                <li>Provide accurate and truthful information</li>
                <li>Keep your account information secure</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </p>
          </section>

          {/* Content Ownership Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Content Ownership and Usage
            </h2>
            <p>
              All content on the ELearning platform, including but not limited
              to courses, videos, and materials, is protected by copyright laws.
              As a user, you agree to use the content solely for personal
              educational purposes.
            </p>
            <p>
              <strong>User-Generated Content:</strong> You retain ownership of
              any content you upload or generate. However, by submitting
              content, you grant ELearning a non-exclusive license to use and
              distribute it on the platform.
            </p>
          </section>

          {/* Payment & Refund Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Payment & Refunds
            </h2>
            <p>
              All payments for courses are processed securely via our payment
              gateway. By purchasing a course, you agree to pay the listed
              price.
            </p>
            <p>
              <strong>Refund Policy:</strong> ELearning offers a 30-day
              money-back guarantee for all courses. If you're unsatisfied with a
              course, you may request a refund within the first 30 days of
              purchase.
            </p>
          </section>

          {/* Privacy Policy Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Privacy Policy
            </h2>
            <p>
              ELearning respects your privacy and is committed to protecting
              your personal information. Please refer to our{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>{" "}
              for detailed information.
            </p>
          </section>

          {/* Code of Conduct Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Code of Conduct
            </h2>
            <p>
              By using ELearning, you agree to engage respectfully with other
              users, instructors, and the content. This includes:
              <ul className="list-disc ml-8 mt-2">
                <li>Respecting the intellectual property rights of others</li>
                <li>Not engaging in harassment or abusive behavior</li>
                <li>Abiding by all applicable laws and platform rules</li>
              </ul>
            </p>
          </section>

          {/* Prohibited Activities Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Prohibited Activities
            </h2>
            <p>
              Users are prohibited from:
              <ul className="list-disc ml-8 mt-2">
                <li>
                  Engaging in fraudulent activity or creating false accounts
                </li>
                <li>Uploading harmful or illegal content</li>
                <li>Distributing malware or other harmful software</li>
              </ul>
            </p>
          </section>

          {/* Termination of Accounts Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Termination of Accounts
            </h2>
            <p>
              ELearning reserves the right to suspend or terminate user accounts
              that violate these policies, including fraudulent activity or
              abusive behavior.
            </p>
          </section>

          {/* Limitation of Liability Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              ELearning is not liable for any indirect, incidental, or
              consequential damages arising from the use of the platform,
              including lost data or profits.
            </p>
          </section>

          {/* Changes to Policy Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Changes to this Policy
            </h2>
            <p>
              ELearning reserves the right to update this policy at any time. We
              will notify users of significant changes through email or platform
              notifications. Continued use of the platform signifies acceptance
              of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Policy;
