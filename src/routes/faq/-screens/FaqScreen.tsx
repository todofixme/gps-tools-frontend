import '../../../i18n/config'
import { useTranslation } from 'react-i18next'

const FaqScreen = () => {
  const { t } = useTranslation(['common', 'faq'])

  return (
    <div className="ml-2 md:ml-6 lg:ml-10 mt-8 text-base-content w-[360px] md:w-[480px] lg:w-[720px]">
      <h1 className="text-6xl font-medium tracking-wide">{t('title')}</h1>
      <p className="text-2xl font-light" id="faqSubtitle">
        {t('faq:subtitle')}
      </p>
      <p className="mt-5">
        <h1 className="text-2xl highlight-color">{t('faq:poi_question')}</h1>
        <div className="float-none md:float-end px-3 mb-2 mt-1">
          <img src="/images/screenshot_garmin.png" alt="Streckenpunkteliste Garmin" />
          <p className="font-thin">({t('faq:image_routelist_subtitle')})</p>
        </div>
        <div className="text-lg">{t('faq:poi_answer')}</div>
      </p>
      <p className="mt-5">
        <h1 className="text-2xl highlight-color">{t('faq:tcx_question')}</h1>
        <div className="text-lg">{t('faq:tcx_answer')}</div>
      </p>
      <p className="mt-5">
        <h1 className="text-2xl highlight-color">{t('faq:devices_question')}</h1>
        <div className="text-lg">{t('faq:devices_answer')}</div>
        <table className="border border-slate-500 border-spacing-2 min-w-full mt-2">
          <caption className="caption-bottom font-thin">({t('faq:devices_note')})</caption>
          <thead>
            <tr>
              <th className="border border-slate-600">{t('faq:devices_name')}</th>
              <th className="border border-slate-600">{t('faq:devices_directory')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-700 p-2">Garmin Outdoor</td>
              <td className="border border-slate-700 p-2">Garmin/GPX</td>
            </tr>
            <tr>
              <td className="border border-slate-700 p-2">Garmin Edge</td>
              <td className="border border-slate-700 p-2">Garmin/NewFiles</td>
            </tr>
            <tr>
              <td className="border border-slate-700 p-2">Wahoo Element</td>
              <td className="border border-slate-700 p-2">Usb Storage/routes</td>
            </tr>
            <tr>
              <td className="border border-slate-700 p-2">Sigma</td>
              <td className="border border-slate-700 p-2">Tracks</td>
            </tr>
            <tr>
              <td className="border border-slate-700 p-2">Hammerhead</td>
              <td className="border border-slate-700 p-2">via Hammerhead-Portal</td>
            </tr>
          </tbody>
        </table>
      </p>
      <p className="mt-5">
        <h1 className="text-2xl highlight-color">{t('faq:merge_question')}</h1>
        <div className="text-lg">{t('faq:merge_answer')}</div>
      </p>
      <p className="mt-10">&nbsp;</p>
    </div>
  )
}

export default FaqScreen
