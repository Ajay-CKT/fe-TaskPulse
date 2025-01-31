const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-10">
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <img
          src="/images/task-pulse-img-1.svg"
          alt="Placeholder"
          className="w-full max-w-md md:max-w-lg rounded-lg pointer-events-none"
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Welcome to TaskPulse
        </h1>
        <p className="text-gray-600 text-sm md:text-lg font-display-2 tracking-wide">
          Effortlessly Manage Your Tasks and Boost Productivity
        </p>
        <ul className="pl-8 space-y-2 list-disc text-left">
          <li className="text-sm tracking-wider">
            <span className="font-display-3 font-semibold pr-1.5">
              Stay Organized:
            </span>
            Keep track of all your tasks in one place and never miss a deadline.
          </li>
          <li className="text-sm tracking-wider">
            <span className="font-display-3 font-semibold pr-1.5">
              Collaborate Seamlessly:
            </span>
            Assign tasks to team members and work together efficiently.
          </li>
          <li className="text-sm tracking-wider">
            <span className="font-display-3 font-semibold pr-1.5">
              Prioritize with Ease:
            </span>
            Set priorities and focus on what matters most.
          </li>
          <li className="text-sm tracking-wider">
            <span className="font-display-3 font-semibold pr-1.5">
              Track Progress:
            </span>
            Monitor the status of your tasks and stay on top of your projects.
          </li>
          <li className="text-sm tracking-wider">
            <span className="font-display-3 font-semibold pr-1.5">
              Stay Informed:
            </span>
            Receive timely reminders and notifications to keep you on track.
          </li>
        </ul>
        <p className="font-display-4 hover:text-orange-400 cursor-pointer">
          Join TaskPulse Today and Transform the Way You Work!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
