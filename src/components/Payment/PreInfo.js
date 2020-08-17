import React from 'react'

import PopupWrapper from '../PopupWrapper'

class MembershipAgreement extends React.Component {
    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hidePreInfoPopup()
    }

    onCloseClick = (event) => {
        this.props.hidePreInfoPopup()
    }

    render() {// TODO REVIEW
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12 d-flex'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <p className='p-lg-5' style={{ whiteSpace: 'break-spaces' }}>
                            <h2 className='text-black text-center mb-5'>Silfavell Elektronik Ticaret Sitesi Üyelik Sözleşmesi</h2>
                            <p><b className='text-black'>A -</b> Taraflar ve Konu</p>
                            
                            <p>
                                <b className='text-black'>1 -</b> Bu sözleşme silfavell.com sitesine üye olmak isteyen internet kullanıcısı (sözleşmenin devam eden hükümlerinde üye olarak anılacaktır) ile Silfavell şirketi (sözleşmenin devam eden hükümlerinde Silfavell olarak anılacaktır) arasında akdedilmiştir.
                            </p>

                            <p>
                                <b className='text-black'>2 -</b>  Bu sözleşme Silfavell’e ait internet sitesinden üyenin faydalanmasına ilişkin şartları ve üyelik ilişkisine ilişkin hak ve borçları düzenler
                            </p>
                            
                            <p>
                                <b className='text-black'>B -</b> Hak ve Yükümlülükler
                            </p>
                            
                            <p>
                                <b className='text-black'>3 -</b> Üye, internet sitesine üye olurken kendisinden talep edilen bilgileri güncel ve doğru bir şekilde beyan etmekle yükümlüdür. Silfavell, Üye tarafından bilgilerin eksik, yanlış veya güncel olmamasından kaynaklı uğrayacağı bütün zararları Üye’den talep edebilir. Üye eksik, yanlış veya güncel olmayan bilgi vermekten ötürü Silfavell’in uğrayacağı bütün zararları tazmin edeceğini kabul ve beyan eder.
                            </p>
                            
                            <p>
                                <b className='text-black'>4 -</b> Üye, internet sitesine giriş için belirlenen şifreyi başka kişi veya kuruluşlara açıklayamaz, veremez. Şifre bizzat üye tarafından kullanılabilir. Aksi gibi bir davranış nedeniyle doğabilecek bütün sorumluluk Üye’ye aittir. Üye’nin şifreyi başka kişi veya kuruluşlara açıklaması nedeniyle üçüncü kişilerin ve kamu kurumlarının Silfavell’e karşı herhangi bir iddia ileri sürmeleri halinde Silfavell her türlü tazminat ve sair talepleri için Üye’nin sorumluluğuna gidebilir.
                            </p>
                            
                            <p>
                                <b className='text-black'>5 -</b> Üye, internet sitesini kullanırken en geniş anlamda bütün hukuk kurallarına uyacağını, bunları ihlal etmemeyi kabul ve taahhüt eder. Aksi gibi bir davranışta bütün sorumluluk Üye’ye aittir.
                            </p>
                            
                            <p>
                                <b className='text-black'>6 -</b> Üye, internet sitesini kullanırken kamu düzenini bozucu, suç teşkil eden, Silfavell’in ve başka kimselerin kişilik hakkını ihlal eden, fikri ve sınai haklarını ihlal eden, kişileri rahatsız eden, taciz eden, yaş, ırk, cinsiyet ve sair şekillerde ayrımcılık yaratan, kişilerin sağlıklı bir çevrede yaşama hakkını ve hayvan haklarını ihlal eden veya başka kimseleri bu türde fiillere teşvik eden davranışlarda bulunamaz. Üye, internet sitesinden veya Silfavell’in sunduğu diğer hizmetlerden başka kimselerin yararlanmasını önlemeye zorlaştırmaya yönelik (truva atı, virüs, spam vb.) kullanımlar yapamaz. Üye, internet sitesi üzerinden veya internet sitesinde kendisine sağlanan hizmetleri kullanarak başka kişi ve kuruluşların koruma altında olan bilgilerine verilerine erişmeye yönelik faaliyetlerde bulunmayacaktır. Aksine bir davranıştan dolayı Silfavell sorumlu tutulamaz.
                            </p>
                            
                            <p>
                                <b className='text-black'>7 -</b> Üye, internet sitesini kullanırken herhangi bir ürün veya hizmete ilişkin tanıtım yapamaz. Üye internet sitesini oluştururken kendi kişisel görüşlerini açıklar. Üye, internet sitesinde yer alan ürün ve hizmetlerle ilgisi olmayan, ifade özgürlüğünün sınırlarının dışında paylaşımlarda bulunamaz. Üye’nin fikirleri ve açıklamaları Silfavell’i bağlamaz.
                            </p>
                            
                            <p>
                                <b className='text-black'>8 -</b> Üyelik sözleşmesinde belirtilen yükümlülüklerin herhangi birine aykırı davranıştan doğan hukuki ve cezai sorumluluk yalnızca üyeye aittir. Üye, üyelik ilişkisine aykırı davranışları neticesinde üçüncü kişiler ve kamu kurumları nezdinde Silfavell’e karşı yöneltilecek iddialardan ve sorumluluk taleplerinden Silfavell’i ari kılacaktır.
                            </p>
                            
                            <p>
                                <b className='text-black'>9 -</b> İnternet sitesinin tasarımı, Silfavell markası ve Silfavell’e ait ürünlerde yer alan, marka, logo ve tasarımlar ve internet sitesi üzerinden Üye’ye sunulan hizmetler Fikri ve Sınai Mülkiyet Hukuku çerçevesinde koruma altındadır. İnternet sitesinde yer alan ve başka kişi ve kuruluşlara ait ürünlerde yer alan marka, logo ve tasarımlar ve hizmetler üzerinde de bunların sahibi kişi ve kuruluşların Fikri ve Sınai Mülkiyet Hukukundan doğan hakları bulunmaktadır.
                            </p>
                            
                            <p>
                                <b className='text-black'>10 -</b> Taraflar arasındaki üyelik ilişkisinin akdedilmiş olması, bu sözleşmede tanınan hakların dışında üye’nin Silfavell’in müşteri kart programına dahil olduğu anlamına gelmez. Üyelik ilişkisinden sonra Üye, Silfavell müşteri kart programına site üzerinden başvurabilir. Üyelik ilişkisinden önce üyenin Silfavell müşteri kart programında bir üyeliği varsa üyenin hesabı ile kart üyeliği, Silfavell tarafından ilişkilendirilir. Üye, sonradan başvuru veya mevcut kart üyeliğinin ilişkilendirilmesi neticesinde kart üyeliğine ilişkin bilgileri internet sitesi üzerinden de görüntüleyebilir. İlişkilendirilmenin yapılmaması nedeniyle Üye, Silfavellden herhangi bir hak talebinde bulunamaz.
                            </p>
                            
                            <p>
                                <b className='text-black'>11 -</b> İnternet sitesi üzerinden sunulan hizmetlerin iyileştirilmesi, Üye’nin siteden yararlanmasının kolaylaştırılması ve kanun hükümleri gereği siteye erişmek için kullanılan İnternet Servis Sağlayıcısının adı ve İnternet Protokol/IP adresi, erişim tarih ve saatleri, internet sitesinde erişilen sayfalar ve internet sitesine bağlanılmasını sağlayan internet sitesinin adresi gibi bilgiler toplanmaktadır.
                            </p>
                            
                            <p>
                                <b className='text-black'>12 -</b> Silfavell, Üye’nin bu üyelik sözleşmesi ile birlikte belirttiği Kişisel Veri İşleme Aydınlatma Bildirimi çerçevesinde sitenin kullanımı, üyelik ilişkisinden kaynaklı hak ve borçların yerine getirilmesi, Üye’nin ilgi alanlarının belirlenerek internet sitesi üzerinde üye’ye önerilerde bulunulması için üyenin kişisel verilerini işlemektedir.
                            </p>
                            
                            <p>
                                <b className='text-black'>13 -</b> Silfavell, üyelik ilişkisinden kaynaklı hakların kullanımında güvenliği sağlama, üyenin kişisel verilerinin güvenliğini sağlama amaçları ile üyelerle SMS veya elektronik posta iletileri yoluyla doğrulama işlemi için iletişime geçebilir veya bu iletişimin sağlanması amacıyla üye verilerini bağlı bulunduğu iştirakleri veya üçüncü kişi çözüm ortaklarına aktarabilir.
                            </p>
                            
                            <p>
                                Silfavell, üye ile üyelik ilişkisi kapsamında sunulan hizmetlerin kalitesini artırma, üyelere daha iyi hizmet sunma, üyelerin şikayetlerine çözüm bulmak amacıyla üyelere SMS veya elektronik posta iletileri yoluyla anket formları gönderebilir veya bu iletişimin sağlanması amacıyla üye verilerini bağlı bulunduğu iştirakleri veya üçüncü kişi çözüm ortaklarına aktarabilir.
                            </p>
                            
                            <p>
                                Silfavell, üyenin kendisine bildirdiği kişisel verilerinin tamamını üyelik ilişkisi devam ettiği sürece kendisi, bağlı bulunduğu iştirakleri ve üçüncü kişi çözüm ortakları nezdinde saklayabilir. Üyelik ilişkisinin sona ermesinden sonra Silfavell, üyelik ilişkisinden kaynaklı olası hukuki uyuşmazlıkların doğru bir şekilde çözümü, üyenin üyelik ilişkisini ihlal ederek Silfavell’e veya üçüncü kişilere zarar verici davranışlarda bulunduğuna ilişkin iddiaların aydınlatılması amaçlarına bağlı olarak üyenin kişisel verilerini kendisi, bağlı bulunduğu iştirakleri ve üçüncü kişi çözüm ortakları nezdinde saklayabilir.
                            </p>
                            
                            <p>
                                Silfavell, kamu kurumlarının emredici hukuk kuralları doğrultusunda talepte bulunması halinde üye kişisel verilerini talep eden kuruluşa açıklar.
                            </p>
                            
                            <p>
                                <b className='text-black'>14 -</b> Silfavell, internet sitesinin güvenliği için imkan dahilinde önlemler almıştır. Üye’nin de kullanıcı adı ve şifresi gibi üyelik ilişkisinden kaynaklı erişim bilgilerini güvenlik altına alması, kendisine ait veya kullanımında olan bilişim sistemini yetkin ve doğru araçlarla ( güvenlik duvarı, anti-virüs yazılımları vs) koruması gerekmektedir. Üye’nin aksi gibi bir davranışından kaynaklı olarak meydana gelecek zararlardan Silfavell sorumlu tutulamaz.
                            </p>
                            
                            <p>
                                <b className='text-black'>15 -</b> Silfavell, üyelik ilişkisi kapsamında sağladığı hizmetleri, internet sitesinin içeriğini tek taraflı değiştirme, üyelik ilişkisini sona erdirme ve internet sitesini kısmen veya tamamen faaliyetten kaldırma, üyelerin bütün bilgilerini silme haklarını saklı tutar. Üyelik sözleşmesi herhangi bir bildirim yapılmadan Silfavell tarafından değiştirilebilir. Üye, üyelik ilişkisini sonlandırmadığı sürece ilgili değişikliklerin yürürlük tarihinde kendisi hakkında da uygulanacağını kabul eder.
                            </p>
                            
                            <p>
                                <b className='text-black'>16 -</b> Üyelik sözleşmesinden kaynaklanan uyuşmazlıklarda Silfavell kayıt ve belgeleri HMK uyarınca münhasır ve yegane delil hükmündedir.
                            </p>
                            
                            <p>
                                <b className='text-black'>C -</b> Sözleşmenin Sona Ermesi
                            </p>
                            
                            <p>
                                <b className='text-black'>17 -</b> Üye, üyelik ilişkisini internet sitesinde bu hak için ayrılmış bölümden her zaman sona erdirebilir. Silfavell, üyelik ilişkisini her zaman herhangi bir neden göstermeksizin veya üyenin üyelik sözleşmesinden kaynaklanan yükümlülüklerinden birini ihlal etmesi üzerine tek taraflı olarak sona erdirebilir.
                            </p>
                            
                            <p>
                                <b className='text-black'>D -</b> Görevli ve Yetkili Mahkeme
                            </p>
                            
                            <p>
                                <b className='text-black'>18 -</b> Bu sözleşme Türk Hukukuna tabidir. Bu sözleşmeden kaynaklanan uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkili ve görevlidir.
                            </p>
                            
                            <p>
                                <b className='text-black'>E -</b> Yürürlük
                            </p>
                            
                            <p>
                                <b className='text-black'>19 -</b> Bu üyelik sözleşmesi, üyelik süreci tamamlanmadan önce üyenin dikkatine sunulmuştur. Üyenin, üyelik kaydı yapması bu sözleşmede yer alan bütün hükümleri okuduğu ve bu hükümleri kabul ettiği anlamına gelir. Üyelik sözleşmesi üyelik kaydı yapılması ile yürürlüğe girer.
                            </p>
                        </p>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default MembershipAgreement