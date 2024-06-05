import useLanguage from '../hooks/useLanguage'

const FaqScreen = () => {
  const { getMessage } = useLanguage()

  return (
    <div className="mx-10 mt-8 text-base-content w-[480px] 2xl:w-[720px] xl-w-[720px] l-w-[720px]">
      <h1 className="text-6xl font-medium tracking-wide">GPS-Tools</h1>
      <p className="text-2xl font-light">{getMessage('faq_subtitle')}</p>

      <p className="mt-5">
        <h1 className="text-2xl">{getMessage('faq_1_question')}</h1>
        <div className="float-end px-3 mb-2 mt-1">
          <img src="/images/screenshot_garmin.png" alt="Streckenpunkteliste Garmin" />
          <p className="font-thin">({getMessage('faq_1_image_subtitle')})</p>
        </div>
        <div className="text-lg">{getMessage('faq_1_answer')}</div>
      </p>

      <p className="mt-5">
        <h1 className="text-2xl">{getMessage('faq_2_question')}</h1>
        <div className="text-lg">{getMessage('faq_2_answer')}</div>
      </p>

      <p className="mt-5">
        <h1 className="text-2xl">{getMessage('faq_3_question')}</h1>
        <div className="text-lg">{getMessage('faq_3_answer')}</div>
      </p>
    </div>
  )
}

export default FaqScreen
