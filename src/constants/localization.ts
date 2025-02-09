class Localization {
    /** Lütfen boş geçmeyiniz. */
    public empty = ():LocalizationItem => new LocalizationItem("Lütfen boş geçmeyiniz.");
    /** İçerik {value} karakteri aşmamalıdır. */
    public max= ():LocalizationItem => new LocalizationItem("İçerik {value} karakteri aşmamalıdır.");
    /** Lütfen geçerli e-posta adresi giriniz */
    public emailNotFormat = ():LocalizationItem => new LocalizationItem("Lütfen geçerli e-posta adresi giriniz. ");
    /** Kullanıcı bilgileri yanlış olabilir, lütfen tekrar deneyin */
    public errorUserAndPassword = ():LocalizationItem => new LocalizationItem("Kullanıcı bilgileri yanlış olabilir, lütfen tekrar deneyin.")
    /** Uygun bir say aralığı {value} giriniz ! */
    public min = ():LocalizationItem => new LocalizationItem("Uygun bir say aralığı {value} giriniz !");
    
}

class LocalizationItem{
    private Text:string;

    constructor(text:string){
        this.Text = text;
    }

    public Get = ():string=>{
        
        const newTest = this.Text.replace("{value}","");
        return newTest;
    }

    /**
     * Text içerisinde {value} olan yere değişim uygula
     * @param value 
     * @returns 
     */
    public AddValue = (value:string):LocalizationItem => {
        this.Text = this.Text.replace("{value}",value);
        return this;
        
    }

    /**
     * Text içerisinde {field} ve {value} olan yere değişim uygula
     * @param field 
     * @param value 
     * @returns 
     */
    public AddField = (field:string):LocalizationItem => {
        this.Text = this.Text.replace("{field}",field);
        return this;
    }
}


/** Localization */
const Lclztn= new Localization();
export {Lclztn};
