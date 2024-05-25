export type Data = Array<Record< string, string >>

export interface ApiResponse {
    message: string
    data: JSONFile[]
    // data: Data
}

export interface JSONFile {
    UserID:      string;
    FirstName:   string;
    LastName:    string;
    Email:       string;
    Gender:      Gender;
    DateOfBirth: Date;
    Country:     string;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toFiles(json: string): Files {
        return JSON.parse(json);
    }

    public static filesToJson(value: Files): string {
        return JSON.stringify(value);
    }
}
