import { ContainerScroll } from "../../components/ui/container-scroll-animation";
import dash from '../../../public/dash1.png'

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden h-[125vh] w-[900] bg-gradient-to-b from-[#e6f7e6] to-[#c1e8c1]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2a6e2a] via-[#3b8f3b] to-[#4cb04c]">
              Empowering Agriculture for a <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Sustainable Future
              </span>
            </h1>
          </>
        }
      >
        <img
          src={dash}
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}