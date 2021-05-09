
using System;

namespace BeardMan
{
    public class ExistingBranchNameException : Exception
    {
        public override string Message
        {
            get
            {
                return "Branch name already exists.";
            }
        }
    }

    public class ExistingAdressException : Exception
    {
        public override string Message
        {
            get
            {
                return "Adress already exists.";
            }
        }
    }

    public class ExistingLocationException : Exception
    {
        public override string Message
        {
            get
            {
                return "Location already exists.";
            }
        }
    }
}