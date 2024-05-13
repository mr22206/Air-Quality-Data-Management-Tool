import WelcomeCard from '../components/WelcomeCard'

export default function Index() {
  return (
    <>
      <div className="w-[100%] h-[100vh] text-center  font-bold text-custom-300 bg-white xl:bg-[#ededed]">
        <img
          src="air-pollution.png"
          className="w-[94px] h-[94px] absolute top-[122px] left-[50%] translate-x-[-50%] hidden xl:block"
        />
        <img src="pollution_compose.png" className="w-[100%] hidden xl:block" />
        visible
        <h1 className="font-bold text-[48px] absolute  left-[50%] translate-x-[-50%] top-[140px] xl:top-[240px] text-black w-[500px] md:w-[700px] leading-tight hidden sm:block">
          CENTRALISATION NATIONALE DES DONNEES SUR LES GAZ
        </h1>
        <h1 className="font-bold text-[48px] absolute  left-[50%] translate-x-[-50%] top-[140px] xl:top-[240px] text-black w-[300px] md:w-[700px] leading-tight block sm:hidden ">
          CNDG
        </h1>
        <h2 className=" font-semibold text-[32px] text-[#343434] absolute left-[50%] translate-x-[-50%] top-[265px] xl:top-[365px] w-[575px] hidden md:block">
          Données centralisées, accès instantané et visualisation rapide
        </h2>
        <div className="sm:hidden font-semibold text-[32px] text-start  text-[#343434] absolute left-[50%] translate-x-[-50%] top-[250px] w-full flex flex-col items-center ">
          <WelcomeCard />
        </div>
      </div>

      <div className="sm:flex fixed inset-x-0 bottom-0 z-30 left-[50%] translate-x-[-50%] h-[450px] sm:h-[400px] px-[64px] pt-[48px] rounded-md hidden flex-col items-center bg-white md:shadow-lg w-screen xl:w-[940px] xl:items-start md:w-[500px]">
        <WelcomeCard />
      </div>
    </>
  )
}
