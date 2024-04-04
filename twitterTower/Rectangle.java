import java.util.Scanner;

import static java.lang.Math.abs;

public class Rectangle extends Shape{
    @Override
    public void run() {
        scan();
        double gap = abs(getHeight()-getWidth());
        if (gap>5)
            printPerimeter();
        else
            printArea();
    }
        @Override
    public void printPerimeter() {
        int perimeter = getHeight() * 2 + getWidth() * 2;
        System.out.println("the perimeter is "+ perimeter);
    }
    public void printArea() {
        int area = getHeight() * getWidth();
        System.out.println("the area is "+ area);

    }
}
