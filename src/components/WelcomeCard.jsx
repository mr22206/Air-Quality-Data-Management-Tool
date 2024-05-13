import React from 'react'

export default function WelcomeCard() {
  return (
    <>
      <p className="text-[#008037] font-medium text-[16px]">COMMENCEZ ICI</p>
      <h3 className="text-black font-medium text-[32px] mt-[-8px] mb-[4px] hidden sm:block">
        BIENVENUE SUR CNDG
      </h3>
      <h3 className="text-black font-medium text-[32px] mt-[-8px] mb-[4px] block sm:hidden">
        BIENVENUE
      </h3>
      <div className="w-[61px] h-[6px] bg-[#008037]"></div>
      <div className="pt-[32px] pl-[16px]">
        <div className="flex">
          <img src="lock-icon.png" className="mr-[32px] w-[40px] h-[51px]" />
          <div>
            <p className="text-[20px] font-medium text-black">Connectez Vous</p>
            <p className="text-[12px] font-semibold text-[#8D8D8D] w-[200px] sm:w-[250px]  ">
              Accédez rapidement à votre compte avec une authentification
              sécurisée
            </p>
          </div>
        </div>
        <div className="flex pt-[8px] ">
          <img src="db-icon.png" className="mr-[32px] w-[40px] h-[46px]" />
          <div>
            <p className="text-[20px] font-medium text-black">Interrogez</p>
            <p className="text-[12px] font-semibold text-[#8D8D8D] w-[200px] sm:w-[250px]">
              Explorez les données en profondeur grâce à des requêtes simples et
              rapides
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
            <p className="text-[12px] font-semibold text-[#8D8D8D]  w-[200px] sm:w-[250px]">
              Utilisez le pouvoir de l&apos;intelligence artificielle pour
              obtenir des résultats personnalisés en un instant
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
