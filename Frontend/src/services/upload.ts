
type Data = Array<Record< string, string >>

export const uploadFite = async (file: File): Promise< [ Data? ] > => {

    const formData = new FormData() // constructor
    formData.append('file', file)

    // try {
        
    // } catch (error) {
        
    // }

}