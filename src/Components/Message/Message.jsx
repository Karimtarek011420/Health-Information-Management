import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import man from '../../assets/dart.svg';
import rect from '../../assets/Rectangle.svg';
import './Message.css';
import LangContext from '../../Context/LangProvider';

function Message() {
  const { english, setenglish }   = useContext(LangContext)
  return (
    <div className='pt-5' id='Chairmen'>
      <div className='container-fluid fluid-container '>
        <div className='row message-sec'>
            <div className='row col-md-12 p-0 m-0'>
                <div className='col-md-3 d-flex align-items-end p-0 m-0'>
                    <img src={man} alt="man" className='man-img' />
                </div>
                {english?<>
                <div className="col-md-8 message-text text-center mx-auto">  
                  <h3 className='message-header fw-bold lh-base text-start mt-5'>Message from <span className='message-header-span fw-bold lh-base text-start'>Chairman</span></h3>
                  <p className='message-para fw-normal lh-lg text-start mb-4'>Welcome to the Saudi Health Information Management Association (SHIMA).
                    We are proud to be at the forefront of advancing the health information management profession in Saudi Arabia. Our journey began with a vision to empower healthcare professionals with the knowledge and tools needed to optimize patient care through effective data management.
                    Since our inception, SHIMA has grown into a thriving community of dedicated individuals who share a common goal: to elevate the standards of health information management in the Kingdom. We have achieved significant milestones in our mission to support practitioner placement, foster communication, expand our reach, and enhance teaching and learning initiatives.
                    Moreover, SHIMA is committed to expanding the body of knowledge in health information management through the encouragement of research, writing, and translation of books and articles. We are dedicated to developing the next generation of healthcare leaders by providing scholarships to outstanding students.
                    Our commitment to excellence is reflected in the unwavering support we receive from our members, partners, and the healthcare community as a whole. We are grateful for the opportunities to collaborate with esteemed organizations and contribute to the development of the healthcare sector.
                    SHIMA is dedicated to fostering a collaborative environment between the public and private sectors, facilitating communication among key stakeholders, and staying abreast of national and international advancements in healthcare. By working together, we aim to create a robust healthcare ecosystem that delivers exceptional care to the people of Saudi Arabia.
                    We express our sincere gratitude to His Royal Highness, The Custodian of The Two Holy Mosques King Salman bin Abdulaziz Al Saud, and His Royal Highness Crown Prince for their unwavering support and guidance in advancing the healthcare sector. As we look ahead, SHIMA remains steadfast in its dedication to providing unparalleled support and resources to our members. We are committed to staying at the forefront of industry trends, advocating for the profession, and driving positive change in healthcare.
                    Thank you for your continued support and for being a part of the SHIMA family. Together, we will shape the future of health information management in Saudi Arabia.</p>
              </div>
                
                
                </>:<>
                <div className="col-md-8 message-text text-center mx-auto" style={{ textAlign: 'right', direction: 'rtl' }}>  
                  <h3 className='message-header fw-bold lh-base  mt-5'>رسالة من <span className='message-header-span fw-bold lh-base text-start'>رئيس مجلس الإدارة</span></h3>
                  <p className='message-para fw-normal lh-lg mb-4 fs-6 text-end'>مرحبا بكم في الجمعية السعودية لإدارة المعلومات الصحية (شيما). نحن فخورون بأن نكون في طليعة الارتقاء بمهنة إدارة المعلومات الصحية في المملكة العربية السعودية. بدأت رحلتنا برؤية تتمثل في تمكين المتخصصين في الرعاية الصحية بالمعرفة والأدوات اللازمة لتحسين رعاية المرضى من خلال الإدارة الفعالة للبيانات. منذ تأسيسنا، نمت شيما لتصبح مجتمعًا مزدهرًا من الأفراد المتفانين الذين يشتركون في هدف مشترك: رفع معايير إدارة المعلومات الصحية في المملكة. لقد حققنا معالم مهمة في مهمتنا لدعم تنسيب الممارسين، وتعزيز التواصل، وتوسيع نطاق وصولنا، وتعزيز مبادرات التدريس والتعلم. علاوة على ذلك، تلتزم SHIMA بتوسيع نطاق المعرفة في إدارة المعلومات الصحية من خلال تشجيع البحث والكتابة وترجمة الكتب والمقالات. نحن ملتزمون بتطوير الجيل القادم من قادة الرعاية الصحية من خلال تقديم المنح الدراسية للطلاب المتفوقين. ينعكس التزامنا بالتميز في الدعم الثابت الذي نتلقاه من أعضائنا وشركائنا ومجتمع الرعاية الصحية ككل. ونحن ممتنون لفرص التعاون مع المنظمات الموقرة والمساهمة في تطوير قطاع الرعاية الصحية. تلتزم SHIMA بتعزيز بيئة تعاونية بين القطاعين العام والخاص، وتسهيل التواصل بين أصحاب المصلحة الرئيسيين، ومواكبة التطورات الوطنية والدولية في مجال الرعاية الصحية. من خلال العمل معًا، نهدف إلى إنشاء نظام بيئي قوي للرعاية الصحية يقدم رعاية استثنائية لشعب المملكة العربية السعودية. نعرب عن خالص امتناننا لصاحب السمو الملكي خادم الحرمين الشريفين الملك سلمان بن عبد العزيز آل سعود، وصاحب السمو الملكي ولي العهد على دعمهما وتوجيههما المستمر في النهوض بقطاع الرعاية الصحية. وبينما نتطلع إلى المستقبل، تظل شيما ثابتة في تفانيها في تقديم دعم وموارد لا مثيل لها لأعضائنا. نحن ملتزمون بالبقاء في طليعة اتجاهات الصناعة، والدفاع عن المهنة، وقيادة التغيير الإيجابي في مجال الرعاية الصحية. نشكرك على دعمك المستمر وعلى كونك جزءًا من عائلة شيما. معًا، سنشكل مستقبل إدارة المعلومات الصحية في المملكة العربية السعودية .</p>
              </div>
                
                </>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Message
