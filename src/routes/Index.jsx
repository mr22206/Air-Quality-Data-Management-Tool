export default function Index() {
  return (
    <>
      <div className="w-[100%] h-[100vh] text-center  text-3xl font-bold text-custom-300 bg-[#ededed]">
        <img
          src="radial-gradient.png"
          className="w-[full] h-[600px] top-[65px] absolute left-[50%] translate-x-[-50%]"
        />
        <img
          src="air-pollution.png"
          className="w-[94px] h-[94px] absolute top-[122px] left-[50%] translate-x-[-50%]"
        />
        <img
          src="linear-gradient.png"
          className="w-[100%] h-[118px] absolute top-[700px]"
        />
        <img src="pollution.jpg" className="w-[100%]" />
        <h1 className="font-bold text-[48px] absolute  left-[50%] translate-x-[-50%] top-[240px] text-black w-[700px] leading-tight">
          CENTRALISATION NATIONALE DES DONNEES SUR LES GAZ
        </h1>
        <h2 className=" font-semibold text-[32px] text-[#343434] absolute left-[50%] translate-x-[-50%] top-[365px] w-[575px]">
          Données centralisées, accès instantané et visualisation rapide
        </h2>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 left-[50%] translate-x-[-50%] bg-white w-[940px] h-[400px] px-[64px] pt-[48px] rounded-md ">
        <p className="text-[#008037] font-medium text-[16px]">COMMENCEZ ICI</p>
        <h3 className="text-black font-medium text-[32px] mt-[-8px] mb-[4px]">
          BIENVENUE SUR RWZR
        </h3>
        <div className="w-[61px] h-[6px] bg-[#008037]"></div>
        <div className="pt-[32px] pl-[16px]">
          <div className="flex">
            <img src="lock-icon.png" className="mr-[32px] w-[40px] h-[51px]" />
            <div>
              <p className="text-[20px] font-medium text-black">
                Connectez Vous
              </p>
              <p className="text-[12px] font-semibold text-[#8D8D8D] w-[250px]">
                Accédez rapidement à votre compte avec une authentification
                sécurisée
              </p>
            </div>
          </div>
          <div className="flex pt-[8px] ">
            <img src="db-icon.png" className="mr-[32px] w-[40px] h-[46px]" />
            <div>
              <p className="text-[20px] font-medium text-black">Interrogez</p>
              <p className="text-[12px] font-semibold text-[#8D8D8D] w-[250px]">
                Explorez les données en profondeur grâce à des requêtes simples
                et rapides
              </p>
            </div>
          </div>
          <div className="flex pt-[8px]">
            <img
              src="ai-icon.png"
              className="mr-[32px] w-[54px] h-[54px] ml-[-8px]"
            />
            <div className="ml-[-8px]">
              <p className="text-[20px] font-medium text-black">Demandez</p>
              <p className="text-[12px] font-semibold text-[#8D8D8D] w-[250px]">
                Utilisez le pouvoir de l&apos;intelligence artificielle pour
                obtenir des résultats personnalisés en un instant
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
