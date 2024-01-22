
import React from "react";
import Container from "../container";

const Tables = (props) => {
  const { data } = props;
  return (
    <>
      <Container className="flex flex-row lg:gap-10 lg:w-min-[80%] w-[80%] item-center mx-[5%]">
        {/* <div
          className="flex items-center justify-center h-full lg:w-1/2 blur-[3px] hover:blur-0">
          <div>
          </div>
        </div> */}

        <div
          className={`flex flex-wrap items-center lg:w-[100%] w-[100%] mx-[5%] lg:mx-auto p-10 dark:border-white border border-black`}>
          <div>
            <div className="flex flex-col w-full my-auto">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                {data.title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                {data.desc}
              </p>
            </div>

            <div className="lg:w-[100%] w-[80%] my-auto">
              {data.bullets.map((item, index) => (
                <Table key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Table>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

function Table(props) {
  return (
    <>
      <div className="flex items-start mt-8 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-teal-500 rounded-md w-11 h-11 ">
          {React.cloneElement(props.icon, {
            className: "w-7 h-7 text-indigo-50",
          })}
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {props.title}
          </h4>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {props.children}
          </p>
        </div>
      </div>
    </>
  );
}

export default Tables;
