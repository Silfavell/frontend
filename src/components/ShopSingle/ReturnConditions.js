import React from 'react'

class ReturnConditions extends React.Component {
    render() { // TODO review gerekebilir
        return (
            <div className='my-3'>
                <div className='col-md-12'>
                    <b>İptal Koşulları:</b>
                    <p style={{ whiteSpace: 'break-spaces' }}>
                        Sipariş adımlarını tamamlayarak ödemenizi gerçekleştirdikten sonra siparişinizin iptali için talep oluşturabilirsiniz. Talebinizi mobil cihazınız veya <a href='/return-items'>buradan</a> oluşturabilirsiniz.
                    </p>
                    <br/>
                    <b>İade Koşulları:</b>
                    <p style={{ whiteSpace: 'break-spaces' }}>İade talebinizin olumlu sonuçlanması durumunda Müşteri Hizmetlerimizin sağlayacağı Kargo İade kodunu kullanarak MNG Kargo ile satın almış olduğunuz ürünleri iade edebilirsiniz. İade talebiniz olumlu karşılansa da kullanılmış, ambalajı açılmış ya da bozulmuş ürünlerin iadesi yapılamamaktadır. Şampuan, duş jeli, cilt ve saç bakım ürünleri gibi iadesi sağlık ve hijyen açısından uygun olmayan ürünler için iade yapılamamaktadır. Koruma ambalajı bulunan makyaj, cilt bakım ürünlerinde de koruma bandı açıldığı takdirde iade işlemi yapılamamaktadır. İade etmek istediğiniz ürünlerin bu koşulları karşılamaması durumunda iade onayı iptal edilerek MNG Kargo ile ürünleriniz Alıcı Ödemeli olarak tarafınıza gönderilecektir.</p>
                </div>
            </div>
        )
    }
}

export default ReturnConditions