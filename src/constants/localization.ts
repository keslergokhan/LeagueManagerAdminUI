class Localization {

    
    

    /** Lütfen boş geçmeyiniz. */
    public pleasedonotempty = new LocalizationItem("Lütfen boş geçmeyiniz.");
    /** İçerik {value} karakteri aşmamalıdır. */
    public maxChar=new LocalizationItem("İçerik {value} karakteri aşmamalıdır.");
    /** Lütfen geçerli e-posta adresi giriniz */
    public emailNotFormat = new LocalizationItem("Lütfen geçerli e-posta adresi giriniz. ");
    /** Kullanıcı bilgileri yanlış olabilir, lütfen tekrar deneyin */
    public errorUserAndPassword = new LocalizationItem("Kullanıcı bilgileri yanlış olabilir, lütfen tekrar deneyin.")
    
}

class LocalizationItem{
    private Test:string;

    constructor(text:string){
        this.Test = text;
    }

    public Get = ():string=>{
        return this.Test;
    }

    /**
     * Text içerisinde {value} olan yere değişim uygula
     * @param value 
     * @returns 
     */
    public AddValue = (value:string):LocalizationItem => {
        this.Test = this.Test.replace("{value}",value);
        return this;
        
    }

    /**
     * Text içerisinde {field} ve {value} olan yere değişim uygula
     * @param field 
     * @param value 
     * @returns 
     */
    public AddField = (field:string):LocalizationItem => {
        this.Test = this.Test.replace("{field}",field);
        return this;
    }
}


/** Localization */
const Lclztn= new Localization();
export {Lclztn};
