import pandas as pd
import os
import datetime


class Excel:
    def __init__(
        self, file: str, sheet_name: str = None, skiprows: int = 0, usecols: list = None
    ):
        self.file = file
        self.sheet_name = sheet_name
        self.skiprows = skiprows
        self.usecols = usecols
        self.df = None

    def process(self) -> None:
        # Read the Excel file
        df = pd.read_excel(
            self.file,
            sheet_name=self.sheet_name,
            skiprows=self.skiprows,
            usecols=self.usecols,
        )

        # Rename columns
        df.columns = ["Passed", "Job No.", "Code Head"]

        # Drop rows with NaN values in the specified columns
        filtered_df = df.dropna(subset=["Passed", "Job No.", "Code Head"])
        self.df = filtered_df

    def searchByJobNo(self, job: str) -> pd.DataFrame:
        # Filter DataFrame by Job No.
        return self.df[self.df["Job No."] == job]

    def searchByCodeHead(self, codeHead: str) -> pd.DataFrame:
        # Filter DataFrame by Code Head
        return self.df[self.df["Code Head"] == codeHead]


class File:
    UPLOAD_FOLDER = "data"

    @staticmethod
    def is_allowed_type(filename: str) -> bool:
        ALLOWED_EXTENSIONS = {"xlsx"}
        return (
            "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
        )

    @staticmethod
    def create_directory(app):
        os.makedirs(File.UPLOAD_FOLDER, exist_ok=True)
        app.config["UPLOAD_FOLDER"] = File.UPLOAD_FOLDER

    @staticmethod
    def save_file(app, file):

        if file is None or not file.filename:
            return False

        if not File.is_allowed_type(file.filename):
            return False

        upload_folder = app.config["UPLOAD_FOLDER"]

        # Check if the directory exists; if not, create it
        if not os.path.exists(upload_folder):
            try:
                File.clear_all()
                os.makedirs(upload_folder)
            except Exception as e:
                return print(f"Error creating directory: {e}")

        try:
            timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
            _, file_extension = os.path.splitext(file.filename)
            filepath = os.path.join(
                app.config["UPLOAD_FOLDER"], f"{timestamp}.{file_extension}"
            )
            file.save(filepath)
            return True
        except FileNotFoundError:
            return print("File Not Found")
        except Exception as e:
            return print(f"Error saving file: {e}")

    @staticmethod
    def clear_all():
        # Check if the directory exists
        if os.path.exists(File.UPLOAD_FOLDER):
            try:
                for root, dirs, files in os.walk(File.UPLOAD_FOLDER, topdown=False):
                    for name in files:
                        os.remove(os.path.join(root, name))
                    for name in dirs:
                        os.rmdir(os.path.join(root, name))
                os.rmdir(File.UPLOAD_FOLDER)
                print("Data folder cleared successfully")
            except Exception as e:
                print(f"Error clearing data folder: {e}")
