import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
    int choice = 0;
    while (choice != 3){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Select an option:\r\n"
                + "-Press 1 if to select a rectangle.\r\n"
                + "-Press 2 if to select a triangle.\r\n"
                + "-Press 3 to exit the program.");
        choice= scanner.nextInt();
    Shape shape = null;
    if (choice == 2 ) {
        shape = new Triangle();
        shape.run();
    }
    else if (choice == 1) {
        shape = new Rectangle();
        shape.run();
    }
        System.out.println("------");
    }
    }
}