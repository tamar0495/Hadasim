import java.util.Scanner;
public class Triangle extends Shape{
    @Override
    public void run() {
        scan();
    Scanner scanner = new Scanner(System.in);
    System.out.println("press 1 to calculate triangle perimeter \n " +
            "press 2 to print triangle");
    int whatToPrint = scanner.nextInt();
    if (whatToPrint == 1)
        printPerimeter();
    else if(whatToPrint == 2)
        printTriangle();
    else
        System.out.println("please type 1 or 2");
    }

    @Override
    public void printPerimeter() {
        double hypotenuse = Math.sqrt(Math.pow(getHeight(), 2) + Math.pow(getWidth(), 2));
        double perimeter = hypotenuse + hypotenuse + getWidth();
        System.out.println("The perimeter of the triangle is:  " + perimeter);
    }
    public void printTriangle() {
        int width = getWidth();
        int height = getHeight();
        if (width % 2 == 0 || width / 2 > height) {
            System.out.println("לא ניתן להדפיס את המשולש");
            return;
        }
        if (width == 1) {
            for (int i = 0; i < height; i++) {
                System.out.println("*");
            }
            return;
        }

        System.out.println(repeat(1));
        int odds = (width - 1 -3) / 2 +1;
        int stages = (height -2) / odds;
        int sheerit = stages + (height-2) % odds;

        for (int i=0; i<sheerit; i++)
        {
            System.out.println(repeat(3));
        }

        int oddsIndex = 5;
        for (int i=0; i<odds-1; i++)
        {
            for(int j=0; j<stages; j++)
            {
                System.out.println(repeat(oddsIndex));
            }
        oddsIndex+=2;
        }
        System.out.println(repeat(width));

    }
    public String repeat(int times){
        String newString="";
        for (int i = 0; i<times; i++)
        {
            newString= newString.concat("*");
        }
        newString = addSpace(newString);
        return newString;
    }
    public String addSpace(String s){
        String newString = "";
        String spaces ="";
        int length = s.length();
        int spacesSum = (getWidth()-length)/2;
        for (int i=0; i<=spacesSum;i++){
            spaces = spaces+" ";
        }
        newString = newString.concat(spaces);
        newString = newString.concat(s);
        return newString;
    }
    }
